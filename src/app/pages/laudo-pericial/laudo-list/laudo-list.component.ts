import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { Status } from '../../../model/status';
import { Quesito } from '../../quesito/shared/quesito.model';
import { LaudoPericialService } from '../shared/laudo-pericial.service';
import { LaudoFilter } from '../shared/laudo.filter';
import { LaudoPericial } from './../shared/laudo-pericial';
import { MessageComponent } from '../../../components/message/message.component';

@Component({
  selector: 'app-laudo-list',
  templateUrl: './laudo-list.component.html',
  styleUrl: './laudo-list.component.css'
})
export class LaudoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;
  totalRegistros = 0;
  filtro = new LaudoFilter();
  laudos!: LaudoPericial[];
  @Input() laudo = new LaudoPericial();

  progresso: { [key: string]: number } = {};

  laudoDialog: boolean = false;
  submitted: boolean = false;

  listaStatus = Status.getOptions();

  laudosSelecionado!: LaudoPericial[] | null;

  constructor(
    private laudoService: LaudoPericialService,
    private error: ErrorHandlerService,
    private title: Title,
    private mensagemService: MessageService,
    private confirmacaoService: ConfirmationService,
    private message: MessageComponent
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Laudos');
    this.laudoService.listar()
      .then((dados) => {
        (this.laudos = dados);
      });

    this.carregarLaudos();
  }

  getSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | undefined {
    const statusOption = this.listaStatus?.find((option: { value: string; }) => option.value === status);
    return statusOption ? statusOption.severity : undefined;
  }
  getStatusLabel(status: string): string | undefined {
    const statusOption = this.listaStatus?.find((option: { value: string; }) => option.value === status);
    return statusOption ? statusOption.label : undefined;
  }

  openNew() {
    this.laudo = {};
    this.submitted = false;
    this.laudoDialog = true;
  }

  salvarLaudo() {
    this.submitted = true;

    if (this.laudo.objetivo?.trim()) {
      if (this.laudo.id) {
        this.laudos[this.findIndexById(this.laudo.id)] = this.laudo;
        this.mensagemService.add(
          { severity: 'success', summary: 'Sucesso!', detail: 'Laudo atualizado', life: 3000 });
      } else {
        this.laudos.push(this.laudo);
        this.mensagemService.add(
          { severity: 'success', summary: 'Sucesso!', detail: 'Laudo criado', life: 3000 });
      }
      this.laudos = [...this.laudos];
      this.laudoDialog = false;
      this.laudo = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;

    for (let i = 0; i < this.laudos.length; i++) {
      if (this.laudos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  esconderDialog() {
    this.laudoDialog = false;
    this.submitted = false;
  }

  editarLaudo(laudo: LaudoPericial) {
    this.laudo = { ...laudo };
    this.laudoDialog = true;
  }

  deletarLaudosSelecionados() {
    this.message.showConfirmation(
      'Inativar Selecionados?',
      'Obs: Você poderá recuperar ou excluir definitivamente em "Laudos Inativos"'
    ).then(async (confirmado) => {
      if (confirmado) {
        try{
          for(const laudo of this.laudosSelecionado || []) {
            await this.laudoService.desativar(laudo.id!);
          }
          this.laudos = this.laudos.filter((val) => !this.laudosSelecionado?.includes(val));
          this.laudosSelecionado = null;
          this.message.showMessage('Info', 'Itens inativados com sucesso');
        } catch (error) {
          this.message.showError('Erro', 'Houve um erro ao tentar desativar os laudos selecionados');
          console.log(error);
        }
      }
    })
  }

  deletarLaudo(laudo: LaudoPericial) {
    return new Promise((resolve, reject) => {

      this.message.showConfirmation(
        'Confirmar',
        `Você tem certeza em desativar o laudo de número ${laudo.numero}?`,
      ).then((confirmado) => {
        if (confirmado) {
          this.laudos = this.laudos.filter((val) => val.id !== laudo.id);
          this.laudo = {};
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error) => {
        this.message.showError('Erro', 'Houve um erro ao tentar desativar o laudo');
        console.log(error);
        reject(error);
      });
    });
  }

  ativar(laudo: LaudoPericial): void {
    this.laudoService.ativar(laudo.id!)
      .then(() => {
        laudo.ativo = true;
        this.message.showMessage('Info', 'Laudo ativado com sucesso');
      })
      .catch(error => {
        this.message.showError('Erro', 'Erro ao ativar laudo');
        console.error(error);
      });
  }

  desativar(laudo: LaudoPericial): void {
    this.deletarLaudo(laudo).then((confirmado) => {
      if (confirmado) {
        this.laudoService.desativar(laudo.id!)
          .then(() => {
            laudo.ativo = false;
            this.message.showMessage('Info', 'Laudo desativado com sucesso');
          })
          .catch(error => {
            this.message.showError('Erro', 'Erro ao ativar laudo');
            console.error(error);
          });
      }
    }).catch(error => {
      console.error(error);
    });
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  async carregarLaudos(): Promise<void> {
    try {
      const laudos = await this.laudoService.listar();
      this.laudos = laudos;
      this.laudos.forEach(laudo => {
        if (laudo.id) {
          this.progresso[laudo.id] = this.calcularProgresso(laudo);
        }
      });
    } catch (error) {
      console.error('Erro ao buscar laudos: ', error);
    };

  }


  calcularProgresso(laudo: LaudoPericial): number {
    const totalEtapas = this.calcularTotalEtapas(laudo);
    const etapasCompletadas = this.calcularEtapasCompletadas(laudo);

    const progresso = (etapasCompletadas / totalEtapas) * 100;
    return Math.round(progresso);
  }

  obterEtapas(laudo: LaudoPericial): any[] {
    const etapas = [
      { atributo: 'id', isCompleted: !!laudo.id },
      { atributo: 'objetivo', isCompleted: !!laudo.objetivo },
      { atributo: 'historico', isCompleted: !!laudo.historico },
      { atributo: 'metodologiaAplicada', isCompleted: !!laudo.metodologiaAplicada },
      { atributo: 'exameDaMateria.descricao', isCompleted: !!laudo.exameDaMateria?.descricao },
    ];

    if (laudo.quesitos && laudo.quesitos.length > 0) {
      laudo.quesitos.forEach((quesito: Quesito) => {
        if (quesito.pergunta) {
          etapas.push({ atributo: `quesito.${quesito.id}.resposta`, isCompleted: !!quesito.resposta });
        }
      });
    }
    return etapas;
  }

  calcularTotalEtapas(laudo: LaudoPericial): number {
    let totalEtapas = this.obterEtapas(laudo).length;

    if (laudo.exameDaMateria?.objetosIds && laudo.exameDaMateria?.objetosIds?.length > 0) {
      totalEtapas += laudo.exameDaMateria?.objetosIds?.length;
    }

    if (laudo?.quesitos && laudo?.quesitos?.length > 0) {
      totalEtapas += laudo.quesitos.filter((quesito: Quesito) => quesito.pergunta).length;

    }
    return totalEtapas;
  }

  calcularEtapasCompletadas(laudo: LaudoPericial): number {
    let etapasCompletadas = this.obterEtapas(laudo).filter(etapa => etapa.isCompleted).length;

    if (laudo.exameDaMateria?.objetosIds && laudo.exameDaMateria?.objetosIds.length > 0) {
      etapasCompletadas += laudo.exameDaMateria?.objetosIds?.length;
    }

    if (laudo?.quesitos && laudo.quesitos?.length > 0) {
      etapasCompletadas += laudo.quesitos.filter((quesito: Quesito) => quesito.pergunta && quesito.resposta).length;

    }
    return etapasCompletadas;
  }

}

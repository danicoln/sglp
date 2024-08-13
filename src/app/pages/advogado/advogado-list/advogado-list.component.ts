import { Component, OnInit, ViewChild } from '@angular/core';
import { Advogado } from '../shared/advogado.model';
import { AdvogadoService } from '../shared/advogado.service';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-advogado-list',
  templateUrl: './advogado-list.component.html',
  styleUrl: './advogado-list.component.css'
})
export class AdvogadoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;
  totalRegistros = 0;
  advogados!: Advogado[];

  progresso: { [key: string]: number } = {};

  recursoDialog: boolean = false;
  submitted: boolean = false;
  saving: boolean = false;

  listaStatus?: any[];

  advogado!: Advogado;

  itensSelecionados!: Advogado[] | null;

  constructor(
    private advogadoService: AdvogadoService,
    private error: ErrorHandlerService,
    private mensagemService: MessageService,
    private title: Title,
    private confirmacaoService: ConfirmationService,
  ) { }


  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Advogados');
    this.advogadoService.listar()
      .then((dados) => {
        (this.advogados = dados);
      });
  }

  openNew() {
    this.advogado = {};
    this.submitted = false;
    this.recursoDialog = true;
  }

  deletarItensSelecionados() {
    this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar os advogados selecionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        this.itensSelecionados?.forEach(itens => {
          const advogadoId = typeof this.advogado.id === 'string' ? this.advogado.id : '';

          if (advogadoId) {
            this.advogadoService.excluir(advogadoId)
              .then(() => {
                this.advogados = this.advogados.filter((val) => !this.itensSelecionados?.includes(val));
                this.itensSelecionados = [...this.advogados];
                this.listar();
              })
              .catch(erro => {
                console.error('Erro ao excluir os itens: ', erro);
              });
          }
        });
        this.itensSelecionados = [];
        this.mensagemService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Advogados apagados',
          life: 3000
        });
      }
    });
  }

  listar() {
    this.advogadoService.listar();
  }


  salvar() {
    if (this.saving) {
      return;
    }
    this.saving = true;
    this.submitted = true;

    this.advogadoService.atualizar(this.advogado).subscribe(
      (advAtualizado: Advogado) => {

        const index = this.advogados.findIndex(p => p.id === advAtualizado.id);
        if (index !== -1) {
          this.advogados[index] = advAtualizado;
        }

        this.mensagemService.add({
          severity: 'success', summary: 'Sucesso!', detail: 'Dados atualizados', life: 3000
        });
        this.esconderDialog();
        this.saving = false;
      },
      erro => {
        this.error.handle(erro);
        console.error('Ops! Erro ao atualizar a nomeação: ', erro);
        this.saving = false;
      }
    );

  }


  findIndexById(id: string): number {
    let index = -1;

    for (let i = 0; i < this.advogados.length; i++) {
      if (this.advogados[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  esconderDialog() {
    this.recursoDialog = false;
    this.submitted = false;
  }

  editar(advogado: Advogado) {
    this.advogado = { ...advogado };
    this.recursoDialog = true;
  }

  deletar(advogado: Advogado) {

    this.confirmacaoService.confirm({
      message: 'Você tem certeza que quer deletar' + advogado.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (advogado.id !== undefined) {
          this.advogadoService.excluir(advogado.id)
            .then(() => {
              this.advogados = this.advogados.filter((val) => val.id !== advogado.id);
              this.advogado = {};
              this.mensagemService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Advogado pericial deletado',
                life: 3000
              });
            })
            .catch((erro) => {
              this.mensagemService.add({
                severity: 'error',
                summary: 'Erro',
                detail: erro,
                life: 3000
              });
            });
        }
      }
    });
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

}

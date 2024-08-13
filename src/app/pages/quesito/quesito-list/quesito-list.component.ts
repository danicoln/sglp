import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuesitoService } from '../shared/quesito.service';
import { Quesito } from '../shared/quesito.model';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from '../../../components/message/message.component';
import { LaudoPericial } from '../../laudo-pericial/shared/laudo-pericial';

@Component({
  selector: 'app-quesito-list',
  templateUrl: './quesito-list.component.html',
  styleUrl: './quesito-list.component.css'
})
export class QuesitoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;
  @Input() laudoId!: string;
  @Input() quesitoId!: string;
  @Input() laudo = new LaudoPericial();

  novoQuesito = new Quesito();
  quesitos!: Quesito[];
  quesitosSelecionados!: Quesito[] | null;
  quesitoDialog: boolean = false;
  submitted: boolean = false;

  tipoDoResponsavel(): string[] {
    return [
      'AUTOR',
      'REQUERENTE',
      'EXEQUENTE',
      'EMBARGANTE',
      'REU',
      'REQUERIDO',
      'EXECUTADO',
      'EMBARGADO'
    ];
  }

  constructor(
    private route: ActivatedRoute,
    private error: ErrorHandlerService,
    private confirmacaoService: ConfirmationService,
    private msgService: MessageService,
    private message: MessageComponent,
    private quesitoService: QuesitoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.quesitoId = params['quesitoId'];
      this.listar(this.laudoId);
    })
  }

  listar(laudoId: string) {
    this.quesitoService.listar(laudoId)
      .subscribe(
        (quesitos: Quesito[]) => {
          this.quesitos = quesitos;
          if (Object.keys(this.quesitos).length === 0) {
            this.msgService.add({
              severity: 'info', summary: 'Info', detail: 'Nenhum quesito encontrado.', life: 3000
            });
          }
        },
        erro => {
          this.error.handle(erro);
        }
      );
  }

  deletarQuesitosSelecionados() {
    this.message.showConfirmation(
      'Excluir itens selecionados?',
      'Esta ação excluirá os itens selecionados permanentemente'
    ).then(async (confirmado) => {
      if (confirmado) {
        try {
          for (const quesito of this.quesitosSelecionados || []) {
            await this.quesitoService.excluir(this.laudoId, quesito.id!);
          }
          this.quesitos = this.quesitos.filter((value) => !this.quesitosSelecionados?.includes(value));
          this.quesitos = [...this.quesitos];
          this.listar(this.laudoId);
          this.message.showMessage('Info', 'Itens excluídos com sucesso');
        } catch (error) {
          this.handleError(error);
        }
      }
    })
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  deletar(obj: Quesito) {
    return new Promise((resolve, reject) => {
      this.message.showConfirmation(
        'Excluir quesito?',
        'Esta ação excluirá o quesito permanentemente'
      ).then((confirmado) => {
        if (confirmado) {
          this.quesitos = this.quesitos.filter((value) => value.id !== obj.id);
          this.novoQuesito = {};
          this.message.showMessage('Info', 'Quesito excluído');
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error) => {
        this.handleError(error);
        reject(error);
      })
    })
  }

  editar(obj: Quesito) {
    this.novoQuesito = { ...obj };
    this.quesitoDialog = true;
  }

  esconderDialog() {
    this.quesitoDialog = false;
    this.submitted = false;
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.message.showError('Erro!', 'Ocorreu um erro. Por favor, tente novamente');
  }

  salvarEdicao() {
    this.submitted = true;

    this.quesitoService.atualizar(this.laudoId, this.novoQuesito).subscribe(
      (quesitoAtualizado: Quesito) => {
        const index = this.quesitos.findIndex(obj => obj.id === quesitoAtualizado.id);

        if (index !== -1) {
          this.quesitos[index] = quesitoAtualizado;
        }
        this.msgService.add(
          { severity: 'success', summary: 'Sucesso!', detail: 'Quesito atualizado', life: 3000 }
        );
        this.esconderDialog();
      },
      erro => {
        this.handleError(erro);
        console.error('Ops! Erro ao atualizar o quesito: ', erro);
      }
    )
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuesitoService } from '../shared/quesito.service';
import { Quesito } from '../shared/quesito.model';

@Component({
  selector: 'app-quesito-list',
  templateUrl: './quesito-list.component.html',
  styleUrl: './quesito-list.component.css'
})
export class QuesitoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  novoQuesito = new Quesito();
  quesitos!: Quesito[];
  quesitosSelecionados!: Quesito[] | null;
  quesitoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private error: ErrorHandlerService,
    private confirmacaoService: ConfirmationService,
    private msgService: MessageService,
    private quesitoService: QuesitoService
  ){}

    ngOnInit(): void {
      this.listar();
    }

    listar() {
      this.quesitoService.listar()
        .subscribe(
          (quesitos: Quesito[]) => {
            this.quesitos = quesitos;
          },
          erro => {
            this.error.handle(erro);
          }
        );
    }

    deletarQuesitosSelecionados() {
      this.confirmacaoService.confirm({
        message: 'Tem certeza em deletar os quesitos selecionados?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.quesitosSelecionados?.forEach(quesito => {
            const quesitoId = typeof quesito.id === 'string' ? quesito.id : '';

            if (quesitoId) {
              this.quesitoService.excluir(quesitoId)
                .then(() => {
                  this.quesitos = this.quesitos.filter((value) => !this.quesitosSelecionados?.includes(value));
                  this.quesitos = [...this.quesitos];
                })
                .catch(error => {
                  console.error('Erro ao excluir quesito: ', error);
                });
            } else {
              console.error('ID inválido: ', quesito.id);
            }
          });

          this.quesitosSelecionados = [];
          this.msgService.add({ severity: 'success', summary: 'Sucesso', detail: 'Quesitos apagados', life: 3000 });
        }
      });
    }

    applyFilterGlobal(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      if (this.tabela && value) {
        this.tabela.filterGlobal(value, 'contains');
      }
    }

    deletar(obj: Quesito) {
      this.confirmacaoService.confirm({
        message: 'Tem certeza em deletar o quesito: ' + obj.id + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {

          if (obj.id !== undefined) {

            this.quesitoService.excluir(obj.id)
              .then(() => {
                this.quesitos = this.quesitos.filter((value) => value.id !== obj.id);
                this.novoQuesito = {};
                this.msgService.add({
                  severity: 'success', summary: 'Sucesso', detail: 'Nomeação apagada', life: 3000
                });
              })
              .catch((erro) => {
                this.error.handle(erro);
                this.msgService.add({
                  severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o quesito', life: 3000
                });
              })
          } else {
            console.error('ID de quesito é undefined');
          }
        }
      });
    }

    editar(obj: Quesito) {

      this.novoQuesito = {...obj };

      this.quesitoDialog = true;
    }

    esconderDialog() {
      this.quesitoDialog = false;
      this.submitted = false;
    }

    private handleError(erro: any): void {
      this.error.handle(erro);
      this.msgService.add(
        ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao carregar os quesitos. Por favor, tente novamente mais tarde.' })
      )
    }

    salvarEdicao() {
      this.submitted = true;

      this.quesitoService.atualizar(this.novoQuesito).subscribe(
        (quesitoAtualizado: Quesito) => {
          const index = this.quesitos.findIndex(obj => obj.id === quesitoAtualizado.id);

          if (index !== -1) {
            this.quesitos[index] = quesitoAtualizado;
          }

          this.msgService.add({
            severity: 'success', summary: 'Sucesso', detail: 'Quesito Atualizado', life: 3000
          });
          this.esconderDialog();
        },
        erro => {
          this.error.handle(erro);
          console.error('Ops! Erro ao atualizar o quesito: ', erro);
        }
      )
    }

}

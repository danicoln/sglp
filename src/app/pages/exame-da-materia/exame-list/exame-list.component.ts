import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ExameDaMateria } from '../shared/exame.model';

@Component({
  selector: 'app-exame-list',
  templateUrl: './exame-list.component.html',
  styleUrl: './exame-list.component.css'
})
export class ExameListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;
  objetoDialog: boolean = false;
  submitted: boolean = false;
  examesSelecionados!: ExameDaMateria[] | null;
  exames!: ExameDaMateria[];
  exame = new ExameDaMateria();

  constructor(
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private confirmacaoService: ConfirmationService,
    private exameService: ExameDaMateriaService

    ) { }

    ngOnInit(): void {
      this.listar();
    }

    listar() {
      this.exameService.listar()
        .then((dados) => this.exames = dados)
        .catch(erro => this.error.handle(erro));
    }

      deletar(obj: ExameDaMateria) {
        this.confirmacaoService.confirm({
          message: 'Tem certeza em deletar o exame de ID: ' + obj.id + '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => {

            if (obj.id !== undefined) {

              this.exameService.excluir(obj.id)
                .then(() => {
                  this.exames = this.exames.filter((value) => value.id !== obj.id);
                  this.exame = {};
                  this.msgService.add({
                    severity: 'success', summary: 'Sucesso', detail: 'Exame apagado', life: 3000
                  });
                })
                .catch((erro) => {
                  this.error.handle(erro);
                  this.msgService.add({
                    severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o exame', life: 3000
                  });
                })
            } else {
              console.error('ID do exame é undefined');
            }
          }
        });
      }

      deletarExamesSelecionados() {
        this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar os exames selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.examesSelecionados?.forEach(exame => {
          const exameId = typeof exame.id === 'string' ? exame.id : '';

          if (exameId) {
            this.exameService.excluir(exameId)
              .then(() => {
                this.exames = this.exames.filter((value) => !this.examesSelecionados?.includes(value));
                this.exames = [...this.exames];
              })
              .catch(error => {
                console.error('Erro ao excluir exame: ', error);
              });
            } else {
            console.error('ID inválido: ', exame.id);
          }
        });

        this.examesSelecionados = [];
        this.msgService.add({ severity: 'success', summary: 'Sucesso', detail: 'Exames apagados', life: 3000 });
      }
    });
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.msgService.add(
      ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao carregar os exames. Por favor, tente novamente mais tarde.' })
      )
    }

  }

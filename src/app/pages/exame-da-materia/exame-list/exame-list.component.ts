import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ExameDaMateria } from '../shared/exame.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exame-list',
  templateUrl: './exame-list.component.html',
  styleUrl: './exame-list.component.css'
})
export class ExameListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;
  @Input() laudoId!: string;
  @Input() exameId!: string;

  objetoDialog: boolean = false;
  submitted: boolean = false;
  exameSelecionados!: ExameDaMateria[] | null;
  exame = new ExameDaMateria();

  constructor(
    private route: ActivatedRoute,
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private confirmacaoService: ConfirmationService,
    private exameService: ExameDaMateriaService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.exameId = params['exameId'];
      this.listar(this.laudoId, this.exameId);
    });
  }

  listar(laudoId: string, exameId: string) {
    this.exameService.obterExame(laudoId)
      .then((dados) => {
        if(dados) {
          this.exame = dados;
        } else {
          this.exame = new ExameDaMateria;
        }
      })
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

          this.exameService.excluir(this.laudoId, obj.id)
            .then(() => {
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

  deletarExameSelecionado() {
    this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar o exame selecionado?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.exameSelecionados?.forEach(exame => {
          const exameId = typeof exame.id === 'string' ? exame.id : '';

          if (this.laudoId !== undefined) {

            this.exameService.excluir(this.laudoId, exameId)
              .then(() => {
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
        })
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
      ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao carregar os exame. Por favor, tente novamente mais tarde.' })
    )
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ObjetoLaudo } from '../shared/objeto-laudo.model';
import { ObjetoLaudoService } from '../shared/objeto-laudo.service';

@Component({
  selector: 'app-objeto-laudo-list',
  templateUrl: './objeto-laudo-list.component.html',
  styleUrl: './objeto-laudo-list.component.css'
})
export class ObjetoLaudoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  @Input() titulo: string = 'Título Exemplo';
  @Input() laudoId!: string;
  @Input() exameId!: string;
  @Input() objetoId!: string;

  objeto = new ObjetoLaudo();

  objetos!: ObjetoLaudo[];
  objetosSelecionados!: ObjetoLaudo[] | null;

  objetoDialog: boolean = false;
  submitted: boolean = false;
  saving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private objetoService: ObjetoLaudoService,
    private confirmacaoService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.exameId = params['exameId'];
      this.objetoId = params['objetoId'];
      this.listar(this.exameId);
    });
  }

  listar(exameId: string) {
    this.objetoService.listar(exameId)
      .subscribe(
        (objetos) => {
          this.objetos = objetos;

          if (this.objetos.length === 0) {
            this.msgService.add({
              severity: 'info', summary: 'Info', detail: 'Nenhum objeto encontrado.', life: 3000
            });
          }
        },
        erro => {
          this.handleError(erro);
          this.msgService.add({
            severity: 'error', summary: 'Erro', detail: 'Erro ao carregar os objetos. Por favor, tente novamente mais tarde.', life: 3000
          });
        }
      );
  }

  deletarObjetosSelecionados() {
    this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar os objetos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.objetosSelecionados?.forEach(objeto => {
          const objetoId = typeof objeto.id === 'string' ? objeto.id : '';

          if (objetoId) {
            this.objetoService.excluir(this.exameId, objetoId)
              .then(() => {
                this.objetos = this.objetos.filter((value) => !this.objetosSelecionados?.includes(value));
                this.objetos = [...this.objetos];
                this.listar(this.exameId);
              })
              .catch(error => {
                console.error('Erro ao excluir objeto: ', error);
              });
          } else {
            console.error('ID inválido: ', this.objeto.id);
          }
        });

        this.objetosSelecionados = [];
        this.msgService.add({ severity: 'success', summary: 'Sucesso', detail: 'Objetos apagados', life: 3000 });
      }
    });
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  deletar(obj: ObjetoLaudo) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar o objeto: ' + obj?.nomeTitulo + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        if (obj.id !== undefined) {

          this.objetoService.excluir(this.exameId, obj.id)
            .then(() => {
              this.objetos = this.objetos.filter((value) => value.id !== obj.id);
              this.objeto = {};
              this.msgService.add({
                severity: 'success', summary: 'Sucesso', detail: 'Objeto apagado', life: 3000
              });
            })
            .catch((erro) => {
              this.error.handle(erro);
              this.msgService.add({
                severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o objeto', life: 3000
              });
            })
        } else {
          console.error('ID de objeto é undefined');
        }
      }
    });
  }

  editar(obj: ObjetoLaudo) {
    this.objeto = { ...obj };
    this.objeto.data = this.formatarData(this.objeto.data);
    this.objetoDialog = true;
  }

  private formatarData(data: string | undefined): string | undefined {
    if (!data) return undefined;

    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }

  esconderDialog() {
    this.objetoDialog = false;
    this.submitted = false;
    this.objeto = new ObjetoLaudo();
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.msgService.add(
      ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao carregar os objetos. Por favor, tente novamente mais tarde.' })
    )
  }

  salvarEdicao() {
    if (this.saving) {
      return;
    }

    this.saving = true;
    this.submitted = true;

    if (!this.objeto.data) {
      this.msgService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos obrigatórios',
        life: 3000
      });
      return;
    }

    this.objeto.data = new Date(this.objeto.data).toISOString();

    this.objetoService.atualizar(this.exameId, this.objeto).subscribe(
      (objetoAtualizado: ObjetoLaudo) => {

        const index = this.objetos.findIndex(obj => obj.id === objetoAtualizado.id);
        if (index !== -1) {
          this.objetos[index] = objetoAtualizado;
        }

        this.msgService.add({
          severity: 'success', summary: 'Sucesso', detail: 'Objeto Atualizado', life: 3000
        });
        this.esconderDialog();
        this.saving = false;
      },
      erro => {
        this.error.handle(erro);
        console.error('Ops! Erro ao atualizar o objeto: ', erro);
        this.saving = false;
      }
    )
  }

}

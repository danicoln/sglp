import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ObjetoLaudo } from '../shared/objeto-laudo.model';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ObjetoLaudoService } from '../shared/objeto-laudo.service';
import { Documento } from '../../documentos/shared/documento.model';

@Component({
  selector: 'app-objeto-laudo-list',
  templateUrl: './objeto-laudo-list.component.html',
  styleUrl: './objeto-laudo-list.component.css'
})
export class ObjetoLaudoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  @Input() titulo: string = 'Título Exemplo';

  objeto = new ObjetoLaudo();
  documento = new Documento();

  objetos!: ObjetoLaudo[];
  objetosSelecionados!: ObjetoLaudo[] | null;

  objetoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private objetoService: ObjetoLaudoService,
    private confirmacaoService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.objetoService.listar()
      .subscribe(
        (objetos: ObjetoLaudo[]) => {
          this.objetos = objetos;
        },
        erro => {
          this.handleError(erro);
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
            this.objetoService.excluir(objetoId)
              .then(() => {
                this.objetos = this.objetos.filter((value) => !this.objetosSelecionados?.includes(value));
                this.objetos = [...this.objetos];
              })
              .catch(error => {
                console.error('Erro ao excluir objeto: ', error);
              });
          } else {
            console.error('ID inválido: ', objeto.id);
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
      message: 'Tem certeza em deletar o objeto: ' + obj.documento?.nomeTitulo + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        if (obj.id !== undefined) {

          this.objetoService.excluir(obj.id)
            .then(() => {
              this.objetos = this.objetos.filter((value) => value.id !== obj.id);
              this.objeto = {};
              this.msgService.add({
                severity: 'success', summary: 'Sucesso', detail: 'Nomeação apagada', life: 3000
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
    if(obj.documento?.data){
      const dataFormatada = new Date(obj.documento!.data).toLocaleDateString('pt-BR');
      const dataObjeto = new Date(dataFormatada);

      this.objeto = { ...obj, documento: {...obj.documento, data: dataObjeto} };
    } else {
      this.objeto = {...obj };
    }

    this.objetoDialog = true;
  }

  esconderDialog() {
    this.objetoDialog = false;
    this.submitted = false;
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.msgService.add(
      ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao carregar os objetos. Por favor, tente novamente mais tarde.' })
    )
  }

  salvarEdicao() {
    this.submitted = true;

    this.objetoService.atualizar(this.objeto).subscribe(
      (objetoAtualizado: ObjetoLaudo) => {
        const index = this.objetos.findIndex(obj => obj.id === objetoAtualizado.id);

        if (index !== -1) {
          this.objetos[index] = objetoAtualizado;
        }

        this.msgService.add({
          severity: 'success', summary: 'Sucesso', detail: 'Objeto Atualizado', life: 3000
        });
        this.esconderDialog();
      },
      erro => {
        this.error.handle(erro);
        console.error('Ops! Erro ao atualizar o objeto: ', erro);
      }
    )
  }

}
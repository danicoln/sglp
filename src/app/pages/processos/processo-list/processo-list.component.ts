import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { Processo } from '../shared/processo.model';
import { ProcessoService } from '../shared/processo.service';

@Component({
  selector: 'app-processo-list',
  templateUrl: './processo-list.component.html',
  styleUrl: './processo-list.component.css'
})
export class ProcessoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  processo = new Processo();
  processos!: Processo[];
  processosSelecionados!: Processo[] | null;

  processoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private processoService: ProcessoService,
    private error: ErrorHandlerService,
    private confirmacaoService: ConfirmationService,
    private mensagemService: MessageService
  ) { }

  ngOnInit(): void {

    this.listar();
  }

  esconderDialog() {
    this.processoDialog = false;
    this.submitted = false;
  }

  listar() {
    this.processoService.listar()
      .then((dados) => this.processos = dados)
      .catch(erro => this.error.handle(erro));
  }

  salvar() {
    this.submitted = true;

    this.processoService.atualizar(this.processo).subscribe(
      (processoAtualizado: Processo) => {

        const index = this.processos.findIndex(p => p.id === processoAtualizado.id);
        if (index !== -1) {
          this.processos[index] = processoAtualizado;
        }

        this.mensagemService.add({
          severity: 'success', summary: 'Sucesso', detail: 'Processo Atualizado', life: 3000
        });
        this.esconderDialog();
      },
      erro => {
        this.error.handle(erro);
        console.error('Ops! Erro ao atualizar o processo: ', erro);
      }
    );

  }

  editar(processo: Processo) {

    this.processo = { ...processo };
    this.processoDialog = true;

  }

  deletar(processo: Processo) {

    this.confirmacaoService.confirm({
      message: 'Você tem certeza que quer deletar processo de número ' + processo.numero + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        if (processo.id !== undefined) {

          this.processoService.excluir(processo.id)
            .then(() => {
              this.processos = this.processos.filter((value) => value.id !== processo.id);
              this.processo = {};
              this.mensagemService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo apagado', life: 3000 });
            })
            .catch((erro) => {
              this.error.handle(erro);
              this.mensagemService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o processo', life: 3000 });
            });

        } else {
          console.error('ID do processo é undefined');
        }
      }
    });
  }

  deletarProcessosSelecionados() {
    this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar os processos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.processos = this.processos.filter((value) => !this.processosSelecionados?.includes(value));
        this.processosSelecionados = null;
        this.mensagemService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processos apagados', life: 3000 });
      }
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.processos.length; i++) {
      if (this.processos[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }
}

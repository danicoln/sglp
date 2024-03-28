import { Component, OnInit, ViewChild } from '@angular/core';
import { NomeacaoService } from '../shared/nomeacao.service';
import { Nomeacao } from '../shared/nomeacao.model';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nomeacao-list',
  templateUrl: './nomeacao-list.component.html',
  styleUrl: './nomeacao-list.component.css'
})
export class NomeacaoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  nomeacao = new Nomeacao();
  nomeacoes!: Nomeacao[];
  nomeacoesSelecionadas!: Nomeacao[] | null;

  nomeacaoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private nomeacaoService: NomeacaoService,
    private error: ErrorHandlerService,
    private confirmacaoService: ConfirmationService,
    private mensagemService: MessageService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.nomeacaoService.listar()
      .then((dados) => this.nomeacoes = dados)
      .catch(erro => this.error.handle(erro));
  }

  deletarNomeacoesSelecionadas() {
    this.confirmacaoService.confirm({
      message: 'Tem certeza em deletar as nomeações selecionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.nomeacoes = this.nomeacoes.filter((value) => !this.nomeacoesSelecionadas?.includes(value));
        this.nomeacoesSelecionadas = null;
        this.mensagemService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nomeações apagadas', life: 3000 });
      }
    });

  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  editar(nomeacao: Nomeacao) {
    this.nomeacao = {...nomeacao };
    this.nomeacaoDialog = true;
    }

  deletar(nomeacao: Nomeacao) {

    this.confirmacaoService.confirm({
      message: 'Você tem certeza que quer deletar a nomeação referente processo nº ' + nomeacao.processo?.numero + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        if (nomeacao.id !== undefined) {

          this.nomeacaoService.excluir(nomeacao.id)
            .then(() => {
              this.nomeacoes = this.nomeacoes.filter((value) => value.id !== nomeacao.id);
              this.nomeacao = {};
              this.mensagemService.add({ severity: 'success', summary: 'Sucesso', detail: 'Nomeação apagada', life: 3000 });
            })
            .catch((erro) => {
              this.error.handle(erro);
              this.mensagemService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir a nomeação', life: 3000 });
            });

        } else {
          console.error('ID de nomeação é undefined');
        }
      }
    });
  }


  esconderDialog() {
    this.nomeacaoDialog = false;
    this.submitted = false;
  }

  salvarEdicao() {
    this.submitted = true;

    this.nomeacaoService.atualizar(this.nomeacao).subscribe(
      (nomeacaoAtualizada: Nomeacao) => {

        const index = this.nomeacoes.findIndex(p => p.id === nomeacaoAtualizada.id);
        if (index !== -1) {
          this.nomeacoes[index] = nomeacaoAtualizada;
        }

        this.mensagemService.add({
          severity: 'success', summary: 'Sucesso', detail: 'Nomeação Atualizada', life: 3000
        });
        this.esconderDialog();
      },
      erro => {
        this.error.handle(erro);
        console.error('Ops! Erro ao atualizar a nomeação: ', erro);
      }
    );

  }

}

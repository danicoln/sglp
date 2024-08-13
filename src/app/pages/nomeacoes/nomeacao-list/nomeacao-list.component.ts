import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { DateUtilService } from '../../../utils/date-utils';
import { Nomeacao } from '../shared/nomeacao.model';
import { NomeacaoService } from '../shared/nomeacao.service';

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
  disabled: boolean = false;

  constructor(
    private nomeacaoService: NomeacaoService,
    private error: ErrorHandlerService,
    private confirmacaoService: ConfirmationService,
    private mensagemService: MessageService,
    private dateUtilService: DateUtilService
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
        this.nomeacoesSelecionadas?.forEach(nomeacao => {
          const nomeacaoId = typeof nomeacao.id === 'string' ? nomeacao.id : '';

          if (nomeacaoId) {
            this.nomeacaoService.excluir(nomeacaoId)
              .then(() => {
                this.nomeacoes = this.nomeacoes.filter((value) => !this.nomeacoesSelecionadas?.includes(value));
                this.nomeacoes = [...this.nomeacoes];
                this.listar();
              })
              .catch(error => {
                console.error('Erro ao excluir nomeações: ', error);
              });
          }
        });
        this.nomeacoesSelecionadas = [];
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
    this.nomeacao = { ...nomeacao };

    this.nomeacao.dataNomeacao = this.formatarData(this.nomeacao.dataNomeacao);
    this.nomeacao.prazo = this.formatarData(this.nomeacao.prazo);
    this.nomeacao.dataAceite = this.formatarData(this.nomeacao.dataAceite);

    this.nomeacaoDialog = true;
  }

  private formatarData(data: string | undefined): string | undefined {
    if (!data) return undefined;

    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }

  deletar(nomeacao: Nomeacao) {

    this.confirmacaoService.confirm({
      message: 'Você tem certeza que quer deletar a nomeação referente processo de ID: ' + nomeacao.processo + '?',
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
  }

  salvarEdicao() {
    if (this.submitted) {
      return;
    }
    this.submitted = true;

    if (!this.isNomeacaoValida()) {
      this.mensagemService.add({
        severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios', life: 3000
      });
      this.submitted = false;
      return;
    }
    this.convertAndSetDates();

    this.nomeacaoService.atualizar(this.nomeacao).subscribe(
      (nomeacaoAtualizada: Nomeacao) => {
        this.handleSuccess(nomeacaoAtualizada);
        this.submitted = false;
      },
      erro => {
        this.handleError(erro);
        this.submitted = false;
      }
    );
    this.esconderDialog();
  }

  private isNomeacaoValida(): boolean {
    return !!this.nomeacao.dataNomeacao && !!this.nomeacao.prazo && !!this.nomeacao.dataAceite;
  }

  private convertAndSetDates() {
    this.nomeacao.dataNomeacao = this.dateUtilService.convertDateToISOString(
      this.dateUtilService.convertStringToDate(this.nomeacao.dataNomeacao!)
    );
    this.nomeacao.prazo = this.dateUtilService.convertDateToISOString(
      this.dateUtilService.convertStringToDate(this.nomeacao.prazo!)
    );
    this.nomeacao.dataAceite = this.dateUtilService.convertDateToISOString(
      this.dateUtilService.convertStringToDate(this.nomeacao.dataAceite!)
    );
  }

  private handleSuccess(nomeacaoAtualizada: Nomeacao) {
    this.nomeacao = nomeacaoAtualizada;

    const index = this.nomeacoes.findIndex(p => p.id === nomeacaoAtualizada.id);
    if (index !== -1) {
      this.nomeacoes[index] = nomeacaoAtualizada;
    }

    this.mensagemService.add({
      severity: 'success', summary: 'Sucesso', detail: 'Nomeação Atualizada', life: 3000
    });
  }

  private handleError(erro: any) {
    this.error.handle(erro);
    console.error('Ops! Erro ao atualizar a nomeação: ', erro);
  }

}

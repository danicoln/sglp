import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { Nomeacao } from '../shared/nomeacao.model';
import { NomeacaoService } from './../shared/nomeacao.service';
import { Processo } from '../../processos/shared/processo.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nomeacao-form',
  templateUrl: './nomeacao-form.component.html',
  styleUrl: './nomeacao-form.component.css'
})
export class NomeacaoFormComponent implements OnInit {

  nomeacao: Nomeacao = new Nomeacao();
  processo: Processo = new Processo();
  formGroup!: FormGroup;

  nomeacaoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private nomeacaoService: NomeacaoService,
    private formBuilder: FormBuilder,
    private error: ErrorHandlerService,
    private msgService: MessageService
  ) { }


  ngOnInit(): void {
    this.buildResourceForm();
  }

  private buildResourceForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      dataNomeacao: [null, Validators.required],
      prazo: [null, Validators.required],
      dataAceite: [null],
      aceite: [''],
      processo: [null]
    });
  }

  submitForm() {
    if (this.formGroup && this.formGroup.valid) {

      const dadosFormulario = this.formGroup.value;

      const processo = dadosFormulario.processo.processo;
      if (processo) {

        this.nomeacao = {
          aceite: dadosFormulario.aceite,
          dataAceite: dadosFormulario.dataAceite,
          dataNomeacao: dadosFormulario.dataNomeacao,
          prazo: dadosFormulario.prazo,
          processo: processo
        };

        this.salvarDados(this.nomeacao);

      } else {
        console.error('O ID do processo não está definido.');

      }

    } else {
      this.formGroup?.markAllAsTouched();
    }
  }

  salvarDados(nomeacao: Nomeacao) {
    this.nomeacaoService.salvar(nomeacao)
      .then(() => {
        console.log('TOAST: Nomeação salva! ', nomeacao);
        this.msgService.add(
          { severity: 'success', summary: 'Sucesso!', detail: 'Nomeação Salva', life: 3000 });

        this.nomeacao = new Nomeacao();
        this.formGroup?.reset();
      })
      .catch(erro => {
        this.error.handle(erro);
        this.msgService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
        )
      });

  }

  cancelar() {
    this.formGroup?.reset();
  }

}

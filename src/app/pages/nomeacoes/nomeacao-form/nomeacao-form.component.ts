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

  title: string = "Aceite: ";
  nomeacao: Nomeacao = new Nomeacao();
  processo: Processo = new Processo();
  formGroup!: FormGroup;

  nomeacaoDialog: boolean = false;
  submitted: boolean = false;
  aceitouNomeacao: boolean = false;
  aceite: string = '';

  constructor(
    private nomeacaoService: NomeacaoService,
    private formBuilder: FormBuilder,
    private error: ErrorHandlerService,
    private msgService: MessageService
  ) { }


  ngOnInit(): void {
    this.buildResourceForm();
    this.aceiteDeNomeacao();
    
    this.formGroup.get('aceite')?.valueChanges.subscribe(value => {
      this.onAceiteChange(value);
      console.log('Valor: ', value)
    });
  }

  private buildResourceForm() {
    this.formGroup = this.formBuilder.group({
      id: [null],
      dataNomeacao: [null, Validators.required],
      prazo: [null, Validators.required],
      dataAceite: [{ value: null, disabled: true }],
      aceite: [''],
      processo: [null],
      honorarioEnviado: [null],
      honorarioHomologado: [null]
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
          processo: processo,
          honorarioHomologado: dadosFormulario.honorarioHomologado,
          honorarioEnviado: dadosFormulario.honorarioEnviado
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
        let errorMessage = 'Erro ao Salvar';

        if (erro && erro.error && erro.error.message) {
          errorMessage = erro.error.message;
        }

        this.error.handle(erro);
        this.msgService.add(
          { severity: 'error', summary: 'Erro!', detail: errorMessage, life: 3000 }
        )
      });

  }

  cancelar() {
    this.formGroup?.reset();
  }

  onAceiteChange(value: string): void {
    this.aceitouNomeacao = value === 'Sim';
    if (!this.aceitouNomeacao) {
      this.formGroup.get('dataAceite')?.setValue(null);
      this.formGroup.get('dataAceite')?.disable();
    } else {
      this.formGroup.get('dataAceite')?.enable();
    }
  }

  aceiteDeNomeacao() {
    const aceiteControl = this.formGroup.get('aceite');
    this.aceitouNomeacao = aceiteControl?.value === 'Sim';
    if (!this.aceitouNomeacao) {
      this.formGroup.get('dataAceite')?.setValue(null);
      this.formGroup.get('dataAceite')?.disable();
    } else {
      this.formGroup.get('dataAceite')?.enable();
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { Nomeacao } from '../shared/nomeacao.model';
import { NomeacaoService } from './../shared/nomeacao.service';
import { Processo } from '../../processos/shared/processo.model';

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
    private NomeacaoService: NomeacaoService,
    private formBuilder: FormBuilder,
    private error: ErrorHandlerService
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
      processo: ['']

      /*
      this.formGroup = this.formBuilder.group({
        processo: this.formBuilder.group({
          id: [null],
          numero: ['', Validators.required],
          comarca: [''],
          vara: [''],
          assunto: [''],
          nomeAutor: [''],
          nomeReu: [''],
          parteAutora: [''],
          parteReu: ['']
        })
      });

      */
    });
  }

  submitForm() {
    if (this.formGroup && this.formGroup.valid) {
      const dadosFormulario = this.formGroup.value;

      const dadosProcesso = this.formGroup.get('processo')?.value;

      console.log('Formulário: Nomeação: ', dadosFormulario);
      console.log('Formulário: Dados Processo: ', dadosProcesso);

      this.formGroup.get('processo')?.setValue(dadosFormulario.processo?.value);
      this.nomeacao = {
        dataNomeacao: dadosFormulario.dataNomeacao,
        prazo: dadosFormulario.prazo,
        dataAceite: dadosFormulario.dataAceite,
        aceite: dadosFormulario.aceite
      };
      this.salvarDados(this.nomeacao);
    } else {
      this.formGroup?.markAllAsTouched();
    }
  }

  salvarDados(nomeacao: Nomeacao) {
    this.NomeacaoService.salvar(nomeacao)
      .then(() => {
        console.log('TOAST: Nomeação salva! ', nomeacao);
        this.nomeacao = new Nomeacao();
        this.formGroup?.reset();
      })
      .catch(erro => this.error.handle(erro));
  }

  cancelar() {
    this.formGroup?.reset();
  }

 
}

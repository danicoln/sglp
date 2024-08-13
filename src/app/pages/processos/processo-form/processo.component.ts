import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Processo } from '../shared/processo.model';
import { ProcessoService } from '../shared/processo.service';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrl: './processo.component.css'
})
export class ProcessoComponent implements OnInit {

  processo: Processo = new Processo();
  @Input() resourceForm!: FormGroup;

  advogadoInserido: boolean = false;
  disabled: boolean = true;

  constructor(
    private processoService: ProcessoService,
    private formBuilder: FormBuilder,
    private error: ErrorHandlerService,
    private msgService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.buildResourceForm();
    this.tiposDeAutor();
    this.tiposDeReu();

  }

  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      numero: [null, Validators.required],
      comarca: [null],
      vara: [null],
      assunto: [''],
      nomeAutor: [''],
      nomeReu: [''],
      parteAutora: [''],
      advogadoAutor:[null],
      parteReu: [''],
      advogadoReu: [null]
    });
  }

  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {
      const dadosFormularios = this.resourceForm.value;

      this.resourceForm.get('parteAutora')?.setValue(dadosFormularios.parteAutora?.value);
      this.resourceForm.get('parteReu')?.setValue(dadosFormularios.parteReu?.value);
      this.processo = {
        numero: dadosFormularios.numero,
        comarca: dadosFormularios.comarca,
        vara: dadosFormularios.vara,
        parteAutora: dadosFormularios.parteAutora?.value,
        parteReu: dadosFormularios.parteReu?.value,
        nomeAutor: dadosFormularios.nomeAutor,
        nomeReu: dadosFormularios.nomeReu,
        assunto: dadosFormularios.assunto,
        advogadoAutor: dadosFormularios.advogadoAutor,
        advogadoReu: dadosFormularios.advogadoReu
      };
      this.salvarDadosProcesso(this.processo);

    } else {
      this.resourceForm?.markAllAsTouched();
    }
  }

  tiposDeAutor(): string[] {
    return [
      'AUTOR',
      'REQUERENTE',
      'EXEQUENTE',
      'EMBARGANTE'
    ];
  }

  tiposDeReu(): string[] {
    return [
      'REU',
      'REQUERIDO',
      'EXECUTADO',
      'EMBARGADO'
    ];
  }


  atualizarDadosProcesso(form: NgForm) {

  }

  salvarDadosProcesso(processo: Processo) {
    this.processoService.salvar(processo)
      .then(() => {
        this.msgService.add(
          {
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Processo Salvo',
            life: 3000
          });

        this.processo = new Processo();
        this.resourceForm?.reset();
      })
      .catch(erro => {
        this.error.handle(erro);
        let errorMessage = 'Erro ao Salvar';

        if (erro && erro.error && erro.error.message) {
          errorMessage = erro.error.message;
        }

        this.error.handle(erro);
        this.msgService.add(
          {
            severity: 'error',
            summary: 'Erro!',
            detail: errorMessage,
            life: 3000
          }
        )
      });

  }

  get editando() {
    return Boolean(this.processo.id);
  }

  cancelar() {
    this.resourceForm?.reset();
  }

  onAdvogadoSelecionado(advogado: any) {

    if (advogado) {
      this.resourceForm.get('advogado')?.patchValue(advogado);
      this.resourceForm.get('advogado')?.markAsDirty();
    }
    this.advogadoInserido = true;
    this.disabled = false;
  }


}

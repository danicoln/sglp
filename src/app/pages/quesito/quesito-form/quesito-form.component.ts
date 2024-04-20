import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { QuesitoService } from '../shared/quesito.service';
import { Quesito } from '../shared/quesito.model';

@Component({
  selector: 'app-quesito-form',
  templateUrl: './quesito-form.component.html',
  styleUrl: './quesito-form.component.css'
})
export class QuesitoFormComponent implements OnInit {

  @Input() responsavel: string = 'Requerente';
  @Input() quesitos!: Quesito[];
  @Input() quesito: string = 'Informe o perito se o contrato firmado entre as partes contém juros abusivos?';
  @Input() resposta: string = 'Resposta:';
  @Input() quesitoForm!: FormGroup;
  @Input() novoQuesito!: Quesito;

  quesitoDialog: boolean = false;
  submitted: boolean = false;
  parteSelecionada: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private erro: ErrorHandlerService,
    private route: ActivatedRoute,
    private quesitoService: QuesitoService
  ){

  }

  ngOnInit(): void {
    this.buildResourceForm();
    this.tipoDoResponsavel();
  }

    private buildResourceForm() {
      this.quesitoForm = this.formBuilder.group({
        id: [null],
        parte: [null, Validators.required],
        quesito: [null],
        resposta: [null]
      })
    }

  submitForm() {
    if(this.quesitoForm && this.quesitoForm.valid) {
      const formularioQuesito = this.quesitoForm.value;

      this.novoQuesito = {
        id: formularioQuesito.id,
      parte: formularioQuesito.parte?.value,
      quesito: formularioQuesito.quesito,
      resposta: formularioQuesito.resposta
      };
    }

    this.salvarQuesito(this.novoQuesito);

  }

  salvarQuesito(quesito: Quesito) {
    this.quesitoService.salvar(quesito)
    .then(() => {
      this.messageService.add(
        { severity: 'success', summary: 'Sucesso!', detail: 'Quesito Salvo', life: 3000 }
      );
      this.novoQuesito = new Quesito();
      this.quesitoForm?.reset();
    })
    .catch(erro => {
      this.erro.handle(erro);
      this.messageService.add(
        {severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
      );
    })
  }



  inserirParte() {
    this.parteSelecionada = !this.parteSelecionada;
  }

  selecionarParte() {
    const responsavel = this.quesitoForm.get('parte')?.value;
    this.responsavel = responsavel;
    return this.responsavel;


  }

  esconderDialog() {
    this.quesitoDialog = false;
    this.submitted = false;
  }

  cancelar() {
    this.quesitoForm?.reset();
  }



  tipoDoResponsavel(): string[] {
    return [
      'AUTOR',
      'REQUERENTE',
      'EXEQUENTE',
      'EMBARGANTE',
      'REU',
      'REQUERIDO',
      'EXECUTADO',
      'EMBARGADO'
    ];
  }

}

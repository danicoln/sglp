import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvogadoService } from '../shared/advogado.service';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Advogado } from '../shared/advogado.model';

@Component({
  selector: 'app-advogado-form',
  templateUrl: './advogado-form.component.html',
  styleUrl: './advogado-form.component.css'
})
export class AdvogadoFormComponent implements OnInit  {

  advogado!: Advogado;
  resourceForm!: FormGroup;

  constructor(
    private advogadoService: AdvogadoService,
    private formBuilder: FormBuilder,
    private error: ErrorHandlerService,
    private msgService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.buildResourceForm();
  }

  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.maxLength(9)]]
    });
  }

  submitForm() {
    if(this.resourceForm && this.resourceForm.valid){
      const formulario = this.resourceForm.value;

      this.advogado = {
        id: formulario.id,
        nome: formulario.nome,
        email: formulario.email,
        telefone: formulario.telefone
      };
      this.salvar(this.advogado)
    }
  }

  salvar(advogado: Advogado) {
    this.advogadoService.salvar(advogado)
    .then(() => {
      this.msgService.add(
        {
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Advogado Salvo',
          life: 3000
        });
        this.advogado = new Advogado();
        this.resourceForm?.reset();
    })
  }

  cancelar() {
    this.resourceForm?.reset();
  }

}

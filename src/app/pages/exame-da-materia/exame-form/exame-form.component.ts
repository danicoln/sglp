import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ExameDaMateria } from '../shared/exame.model';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrl: './exame-form.component.css'
})
export class ExameFormComponent implements OnInit {

  resourceForm!: FormGroup;

  formularioAberto: boolean = false;
  exibirFormObjeto: boolean = false;

  exame = new ExameDaMateria();
  objetos: ObjetoLaudo[] = [];
  objeto!: ObjetoLaudo;

  exameId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private erro: ErrorHandlerService,
    private route: ActivatedRoute,
    private exameService: ExameDaMateriaService,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.exameId = params['exameId'];
    this.buildResourceForm();

  });
  }

  private buildResourceForm() {
    //const exame: ExameDaMateria = this.route.snapshot.data['exame'];
    this.resourceForm = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      objetos: this.formBuilder.array([])
    });
  }

  private getObjetos(): ObjetoLaudo[] {
    return this.objetos;
  }


  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {
      const formulario = this.resourceForm.value;

      this.exame = {
        descricao: formulario.descricao,
          objetos: this.getObjetos()
      };

      this.salvarExame(this.exame);

    } else {
      console.error('Erro ao salvar exame');
    }

    this.resourceForm?.markAllAsTouched();

  }

  salvarExame(exame: ExameDaMateria) {
    this.exameService.salvar(exame)
      .then((exameSalvo) => {

        this.messageService.add(
          { severity: 'success', summary: 'Sucesso', detail: 'Exame Salvo', life: 3000 }
        )

        this.exame = new ExameDaMateria();
        this.resourceForm?.reset();
        this.objetos = [];
      })
      .catch(erro => {
        this.erro.handle(erro);
        this.messageService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
        )
      });
  }

  adicionarObjeto(objeto: ObjetoLaudo) {
    objeto.exameDaMateriaId = this.exameId;
    this.objetos.push(objeto);
  }

}


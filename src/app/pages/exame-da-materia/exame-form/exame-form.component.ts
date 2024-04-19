import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ExameDaMateria } from '../shared/exame.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrl: './exame-form.component.css'
})
export class ExameFormComponent implements OnInit {

  resourceForm!: FormGroup;

  exibirFormulario: boolean = false;
  exibirFormObjeto: boolean = false;

  exame = new ExameDaMateria();
  listaDeObjetos!: ObjetoLaudo[];
  objeto!: ObjetoLaudo;


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private erro: ErrorHandlerService,
    private route: ActivatedRoute,
    private exameService: ExameDaMateriaService,

  ) { }

  ngOnInit(): void {
    this.baseResourceForm();
  }

  private baseResourceForm() {
    //const exame: ExameDaMateria = this.route.snapshot.data['exame'];
    this.resourceForm = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      objetos: this.formBuilder.array([])
    });
  }


  private obterObjetos(exame: ExameDaMateria) {
    const objetos = [];
    if (exame?.objetos) {
      exame.objetos.forEach(obj => objetos.push(this.criarObjeto(obj)));
    } else {
      objetos.push(this.criarObjeto());
    }

    return objetos;
  }

  private criarObjeto(obj: ObjetoLaudo = { id: '', documento: null || undefined }) {
    const objeto = this.formBuilder.group({
      id: [obj.id],
      documento: this.formBuilder.group({
        id: [obj.documento?.id],
        nomeTitulo: [obj.documento?.nomeTitulo],
        descricao: [obj.documento?.descricao],
        data: [obj.documento?.data]
      })
    });
    return objeto;
  }

  abrirFormulario() {
    this.exibirFormObjeto = !this.exibirFormObjeto;
  }

  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {
      const formulario =  this.resourceForm.value;

      const objetosLaudo = formulario.objetos.map((objeto: any) => ({
        ...objeto
      }));

      const novoExame: ExameDaMateria = {
        id: formulario.id,
        descricao: formulario.descricao,
        objetos: objetosLaudo
      }

      this.salvarExame(novoExame);
      console.log(novoExame);
      console.log('Objetos: ', novoExame.objetos);

    } else {
      console.error('Erro ao salvar exame');
    }

    this.resourceForm?.markAllAsTouched();

  }

  salvarExame(exame: ExameDaMateria) {
    this.exameService.salvar(exame)
    .then(() => {
        this.messageService.add(
          { severity: 'success', summary: 'Sucesso', detail: 'Exame Salvo', life: 3000 }
          )
        //exame = new ExameDaMateria();
        //this.resourceForm?.reset();
      })
      .catch(erro => {
        this.erro.handle(erro);
        this.messageService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
          )
        });
      }

  getObjetoFormArray() {
    return (<UntypedFormArray>this.resourceForm.get('objetos')).controls;
  }

  objetos(): FormArray {
    return this.resourceForm.get('objetos') as FormArray;
  }

  novoObjeto() {
    return this.formBuilder.group({
      documento: this.formBuilder.group({
        id: [''],
        nomeTitulo: [''],
        descricao: [''],
        data: ['']
      })
    });
  }

  addObjeto() {
    this.objetos().push(this.novoObjeto());
  }

  removeObjeto(index: number) {
    this.objetos().removeAt(index);
  }

  private preencherObjetoForm(obj: FormGroup, objeto: ObjetoLaudo) {
    obj.patchValue({
      id: objeto.id,
      documento: {
        id: objeto.documento?.id,
        nomeTitulo: objeto.documento?.nomeTitulo,
        descricao: objeto.documento?.descricao,
        data: objeto.documento?.data
      }
    });
  }
}

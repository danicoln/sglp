import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ExameDaMateria } from '../shared/exame.model';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ActivatedRoute } from '@angular/router';
import { ObjetoLaudoService } from '../../objeto-laudo/shared/objeto-laudo.service';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrl: './exame-form.component.css'
})
export class ExameFormComponent implements OnInit {

  resourceForm!: FormGroup;

  formularioAberto: boolean = false;
  exibirFormObjeto: boolean = false;
  descricaoHabilitada: boolean = true;

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
    private objetoService: ObjetoLaudoService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.exameId = params['id'];
      this.buildResourceForm();
      this.carregarExame(this.exameId);
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

  getObjetos(): ObjetoLaudo[] {
    return this.objetos;
  }


  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {
      const formulario = this.resourceForm.value;

      this.exame = {

        descricao: formulario.descricao,
        objetos: this.getObjetos()
      };

      if (this.exameId) {
        this.exame.id = this.exameId;
        this.atualizarExame(this.exame);
      } else {
        this.criarExame(this.exame);
      }
    } else {
      console.error('Erro ao salvar exame');
    }

    this.resourceForm?.markAllAsTouched();

  }

  criarExame(exame: ExameDaMateria) {
    this.exameService.salvar(exame)
      .then((exameSalvo) => {

        this.messageService.add(
          { severity: 'success', summary: 'Sucesso', detail: 'Exame Salvo', life: 3000 }
        )

        this.resourceForm.get('descricao')?.disable();
        this.descricaoHabilitada = false;

      })
      .catch(erro => {
        this.erro.handle(erro);
        this.messageService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
        )
      });
  }

  atualizarExame(exame: ExameDaMateria) {
    this.exameService.atualizar(exame)
      .subscribe(
        (exameAtualizado: ExameDaMateria) => {
          this.messageService.add(
            { severity: 'success', summary: 'Sucesso', detail: 'Exame Atualizado', life: 3000 }
          );
          exame = exameAtualizado;
          if(exame.id){
            this.carregarExame(exame.id);
          }

        },
        (erro: any) => {
          this.erro.handle(erro);
          this.messageService.add(
            { severity: 'error', summary: 'Erro!', detail: 'Erro ao Atualizar Exame', life: 3000 }
          );
        }
      )

  }


  adicionarObjeto(objeto: ObjetoLaudo) {
    objeto.exameDaMateriaId = this.exameId;
    this.objetos.push(objeto);
  }

  carregarExame(exameId: string) {
    this.exameService.buscarPorId(exameId)
      .then((exame: ExameDaMateria) => {
        this.exame = exame;
        this.resourceForm.patchValue({
          id: exame.id,
          descricao: exame.descricao,
          objetos: exame.objetos
        });
        this.resourceForm.get('descricao')?.disable();
      })
      .catch(error => {
        this.erro.handle(error);
        this.messageService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao carregar os detalhes do exame', life: 3000 }
        );
      })
  }

  editarDescricao() {
    if (this.descricaoHabilitada) {
      this.resourceForm.get('descricao')?.enable();
      this.descricaoHabilitada = false;
    }
    //this.resourceForm.get('descricao')?.enable();
  }
}


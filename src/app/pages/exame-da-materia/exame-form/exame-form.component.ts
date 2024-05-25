import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ExameDaMateria } from '../shared/exame.model';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjetoLaudoService } from '../../objeto-laudo/shared/objeto-laudo.service';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrl: './exame-form.component.css'
})
export class ExameFormComponent implements OnInit {

  resourceForm!: FormGroup;

  laudoId!: string;

  formularioAberto: boolean = false;
  exibirFormObjeto: boolean = false;
  descricaoHabilitada: boolean = true;
  idExistente: boolean = false;
  exame: ExameDaMateria = new ExameDaMateria();
  objetos: ObjetoLaudo[] = [];
  objeto!: ObjetoLaudo;

  exameId: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private erro: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private exameService: ExameDaMateriaService,
    private objetoService: ObjetoLaudoService

  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.exameId = params['exameId'];
      this.buildResourceForm();
      if (this.laudoId && this.exameId) {
        this.carregarExame(this.laudoId, this.exameId);
      }
    });
  }



  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      objetos: this.formBuilder.array([])
    });
  }

  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {
      const formulario = this.resourceForm.value;

      this.exame = {
        id: this.exameId,
        descricao: formulario.descricao,
        objetos: this.objetos
      };

      if (this.exameId) {
        this.exame.id = this.exameId;
        this.atualizarExame(this.exame);
      } else {
        this.salvarExame(this.exame)
          .then((exameSalvo) => {
            this.detalhesDoExame(exameSalvo.id!);

          })
      }
    } else {
      console.error('Erro ao salvar exame');
    }

    this.resourceForm?.markAllAsTouched();

  }

  salvarExame(exame: ExameDaMateria): Promise<ExameDaMateria> {
    return new Promise((resolve, reject) => {

      this.exameService.salvar(this.laudoId, exame)
        .then((exameSalvo) => {
          this.exame = exameSalvo;
          this.messageService.add(
            { severity: 'success', summary: 'Sucesso', detail: 'Exame Salvo', life: 3000 }
          )

          this.resourceForm.get('descricao')?.disable();
          resolve(exameSalvo);

        })
        .catch(erro => {
          this.erro.handle(erro);
          this.messageService.add(
            { severity: 'error', summary: 'Erro!', detail: 'Erro ao Salvar', life: 3000 }
          );
          reject(erro);
        });
    })
  }

  atualizarExame(exame: ExameDaMateria): Promise<ExameDaMateria> {
    return new Promise((resolve, reject) => {
      this.exameService.atualizar(this.laudoId, exame)
        .subscribe(
          (exameAtualizado: ExameDaMateria) => {
            this.messageService.add(
              { severity: 'success', summary: 'Sucesso', detail: 'Exame Atualizado', life: 3000 }
            );
            this.exame = exameAtualizado;
            if (exame.id) {
              this.carregarExame(this.laudoId, exame.id);
            }
            resolve(exameAtualizado);

          },
          (erro: any) => {
            this.erro.handle(erro);
            this.messageService.add(
              { severity: 'error', summary: 'Erro!', detail: 'Erro ao Atualizar Exame', life: 3000 }
            );
            reject(erro);
          }
        );
    });

  }

  adicionarObjeto(objeto: ObjetoLaudo) {
    objeto.exameDaMateriaId = this.exameId;
    this.objetos.push(objeto);
  }

  carregarExame(laudoId: string, exameId: string) {
    this.exameService.buscarPorId(laudoId, exameId)
      .then((exame: ExameDaMateria) => {
        this.exame = exame;
        this.resourceForm.patchValue({
          id: exame?.id,
          descricao: exame?.descricao,
          objetos: exame?.objetos
        });
        this.resourceForm.get('descricao')?.setValue(exame.descricao);
        this.resourceForm.get('descricao')?.disable();
        this.exibirFormObjeto = true;

        this.filtrarObjetos(exameId, exame);

        console.log('objetos: ', this.resourceForm.get('objetos')?.value);
      })
      .catch(error => {
        this.erro.handle(error);
        this.messageService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao carregar os detalhes do exame', life: 3000 }
        );
      })

  }

  filtrarObjetos(exameId: string, exame: ExameDaMateria) {
    let objetos = this.objetos;
    if (objetos || objetos !== undefined) {
      exame.objetos?.filter(objeto => objeto.exameDaMateriaId === exameId);
    }
  }

  editarDescricao() {
    if (this.descricaoHabilitada) {
      this.resourceForm.get('descricao')?.enable();
      this.descricaoHabilitada = false;
    }
    //this.resourceForm.get('descricao')?.enable();
  }

  detalhesDoExame(exameId: string) {
    this.router.navigate(['exames', exameId, 'edit']);
  }

  getObjetos(): ObjetoLaudo[] {
    const examesObjetos = this.resourceForm.get('objetos')?.value;
    this.objetos = examesObjetos.filter((objeto: ObjetoLaudo) =>
      objeto.exameDaMateriaId === this.exameId);
    return this.objetos;
  }

}


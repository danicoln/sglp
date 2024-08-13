import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ExameDaMateria } from '../shared/exame.model';
import { ExameDaMateriaService } from '../shared/exame.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjetoLaudoService } from '../../objeto-laudo/shared/objeto-laudo.service';
import { LaudoPericial } from '../../laudo-pericial/shared/laudo-pericial';

@Component({
  selector: 'app-exame-form',
  templateUrl: './exame-form.component.html',
  styleUrl: './exame-form.component.css'
})
export class ExameFormComponent implements OnInit {

  exameContext!: string;
  @Input() laudo = new LaudoPericial();
  @Output() exameSalvo = new EventEmitter<void>();

  resourceForm!: FormGroup;

  laudoId!: string;
  disabled: boolean = false;

  formularioAberto: boolean = false;
  exibirFormObjeto: boolean = false;
  descricaoHabilitada: boolean = true;
  idExistente: boolean = false;
  exame: ExameDaMateria = new ExameDaMateria();
  objetos: ObjetoLaudo[] = [];
  objeto!: ObjetoLaudo;

  exameId!: string;

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
      console.log("LAUDOID:", this.laudoId, "EXAMEID:", this.exameId);
      this.buildResourceForm();
      if (this.laudoId && this.exameId) {
        this.carregarExame(this.laudoId, this.exameId);
      }
    });

    this.exameContext = this.getExameContext();
    this.carregarObjetos(this.exameId);
  }

  
  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      objetosIds: this.formBuilder.array([])
    });
  }

  submitForm() {
    if (this.resourceForm && this.resourceForm.valid) {
      const formulario = this.resourceForm.value;

      this.exame = {
        id: this.exameId,
        descricao: formulario.descricao,
        objetosIds: formulario.objetosIds
      };

      if (this.exameId) {
        this.exame.id = this.exameId;
        this.atualizarExame(this.exame);
      } else {
        this.salvarExame(this.exame);
      }
    } else {
      console.error('Erro ao salvar exame');
    }
  }
  
  salvarExame(exame: ExameDaMateria) {
    this.exameService.salvar(this.laudoId, exame)
      .then((exameCriado: ExameDaMateria) => {
        this.exameId = exameCriado.id!;
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Exame Salvo',
            life: 3000
          });

        this.exame = new ExameDaMateria();
        this.resourceForm?.disable();
      })
      .catch(erro => {
        this.erro.handle(erro);
        let errorMessage = 'Erro ao Salvar';

        if (erro && erro.error && erro.error.message) {
          errorMessage = erro.error.message;
        }

        this.erro.handle(erro);
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Erro!',
            detail: errorMessage,
            life: 3000
          }
        )
      });

  }

  novoObjeto() {
    if (this.exameId) {
      this.router.navigate([`/laudos/${this.laudoId}/edit/exames/${this.exameId}/edit/objetos`]);
    }
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
            this.preencherFormulario(exameAtualizado);
            this.exameSalvo.emit();
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

  preencherFormulario(exame: ExameDaMateria) {
    this.resourceForm.patchValue({
      id: exame.id,
      descricao: exame.descricao,
      objetosIds: exame.objetosIds
    });
    this.resourceForm.get('descricao')?.disable();
    this.exibirFormObjeto = true;
    this.filtrarObjetos(exame.id!, exame);
  }

  adicionarObjeto(objeto: ObjetoLaudo) {
    objeto.exameDaMateriaId = this.exameId;
    this.objetos.push(objeto);
  }

  carregarExame(laudoId: string, exameId: string) {
    this.exameService.buscarPorId(laudoId, exameId)
      .then((exame: ExameDaMateria) => {
        this.preencherFormulario(exame);
      })
      .catch(error => {
        this.erro.handle(error);
        this.messageService.add(
          { severity: 'error', summary: 'Erro!', detail: 'Erro ao carregar os detalhes do exame', life: 3000 }
        );
      })
      this.disabled = false;
      this.resourceForm.disable();

    }
    
    filtrarObjetos(exameId: string, exame: ExameDaMateria) {
      if (exame.objetosIds && exame.objetosIds.length > 0) {
        this.objetos = [];
      for (const objetoId of exame.objetosIds) {
        const objeto = this.objetos.find(obj => obj.id === objetoId);
        if (objeto && objeto.exameDaMateriaId === exameId) {
          this.objetos.push(objeto);
        }
      }
    }
    
  }

  editarDescricao() {
    if (!this.disabled) {
      this.resourceForm?.enable();
      this.disabled = true;
    }
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

  voltar() {
    this.router.navigate(['/laudos', this.laudoId, 'edit', 'exames']);
  }
  
  getExameContext(): string {
    // Lógica para construir o contexto do exame
    const contexto = this.resourceForm.get('descricao')?.value;
    console.log("Contexto: ",contexto);
    console.log("Contexto: ",contexto)
    return `Dados referente ao exame ${contexto}...`;
  }

  carregarObjetos(exameId: string) {
    this.objetoService.listar(exameId).subscribe(
      objetos => {
        this.objetos = objetos;
      }
    )
  }

  cancelar() {
    if (this.exameId) {
      this.carregarExame(this.laudoId, this.exameId);
      this.disabled = false;
      this.resourceForm.disable();
    } else {
      this.limparCampos();
    }
  }

  limparCampos() {
    this.resourceForm.reset();
  }
}


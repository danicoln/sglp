import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ExameDaMateria } from '../../exame-da-materia/shared/exame.model';
import { ExameDaMateriaService } from '../../exame-da-materia/shared/exame.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ObjetoLaudoService } from '../../objeto-laudo/shared/objeto-laudo.service';
import { Quesito } from '../shared/quesito.model';
import { QuesitoService } from '../shared/quesito.service';
import { MessageComponent } from '../../../components/message/message.component';
import { LaudoPericial } from '../../laudo-pericial/shared/laudo-pericial';

@Component({
  selector: 'app-quesito-form',
  templateUrl: './quesito-form.component.html',
  styleUrl: './quesito-form.component.css'
})
export class QuesitoFormComponent implements OnInit {

  @Input() responsavel: string = 'Requerente';
  @Input() quesitos!: Quesito[];
  @Input() quesito: Quesito = new Quesito();
  @Input() laudo?: LaudoPericial;

  contexto!: string;
  exame!: ExameDaMateria;
  objetos: ObjetoLaudo[] = [];
  pergunta: string = '';
  resposta: string = '';
  response!: string;

  @Output() objSalvo = new EventEmitter<void>();

  resourceForm!: FormGroup;

  quesitoDialog: boolean = false;
  submitted: boolean = false;
  parteSelecionada: boolean = false;
  disabled: boolean = false;
  laudoId!: string;
  quesitoId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private message: MessageComponent,
    private erro: ErrorHandlerService,
    private route: ActivatedRoute,
    private quesitoService: QuesitoService,
    private exameService: ExameDaMateriaService,
    private objetoService: ObjetoLaudoService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.quesitoId = params['quesitoId'];
      this.buildResourceForm();
      if (this.laudoId && this.quesitoId) {
        this.carregarQuesito(this.laudoId, this.quesitoId);
      }
    });

    if (this.laudoId) {
      this.carregarExame(this.laudoId).then(() => {
        if (this.exame?.id) {
          this.carregarObjetos(this.exame.id);
        }
        this.contexto = this.getExameContext();
      });
    }

  }

  carregarQuesito(laudoId: string, quesitoId: string) {
    this.quesitoService.buscarPorId(laudoId, quesitoId)
      .then((quesito: Quesito) => {
        this.preencherFormulario(quesito);
      })
      .catch(error => {
        this.erro.handle(error);
        this.message.showError('Erro!', 'Erro ao carregar os detalhes do quesito');
      })
  }

  preencherFormulario(quesito: Quesito) {
    this.resourceForm.patchValue({
      id: quesito.id,
      parte: quesito.parte,
      pergunta: quesito.pergunta,
      resposta: quesito.resposta
    });
    this.resourceForm?.disable();
  }

  editar(): void {
    if (!this.disabled) {
      this.resourceForm?.enable();
      this.disabled = true;
    }
  }

  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      parte: [null, Validators.required],
      pergunta: [null],
      resposta: [null],
      laudoId: ['']
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.resourceForm.valid) {
      const formularioQuesito = this.resourceForm.value;

      const novoQuesito = this.quesito = {
        id: formularioQuesito.id,
        parte: formularioQuesito.parte,
        pergunta: formularioQuesito.pergunta,
        resposta: formularioQuesito.resposta,
        laudoId: this.laudoId
      }

      if (this.quesitoId) {
        novoQuesito.id = this.quesitoId;
        this.atualizarQuesito(novoQuesito);
        this.resourceForm.disable();
        this.submitted = false;
        this.disabled = true;
      } else {
        this.salvarQuesito(novoQuesito);
        this.resourceForm.reset();
        this.submitted = false;
        this.disabled = true;
      }
    } else {
      console.error('Erro ao salvar o quesito');
    }
  }

  salvarQuesito(quesito: Quesito): Promise<Quesito> {
    return new Promise((resolve, reject) => {
      this.quesitoService.salvar(this.laudoId, quesito)
        .then(quesitoSalvo => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Quesito Salvo',
            life: 3000
          });
          this.objSalvo.emit();
          resolve(quesitoSalvo);
        })
        .catch(erro => {
          this.erro.handle(erro);
          this.message.showError('Erro!', 'Erro ao Salvar');
          reject(erro);
        });
    });
  }

  atualizarQuesito(quesito: Quesito): Promise<Quesito> {
    return new Promise((resolve, reject) => {
      this.quesitoService.atualizar(this.laudoId, quesito)
        .subscribe(
          (quesitoAtualizado: Quesito) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Quesito Atualizado',
              life: 3000
            });
            this.objSalvo.emit();
            resolve(quesitoAtualizado);
          },
          (erro: any) => {
            this.erro.handle(erro);
            this.message.showError('Erro!', 'Erro ao atualizar o quesito');
            reject(erro);
          }
        );
    });
  }

  inserirParte() {
    this.parteSelecionada = !this.parteSelecionada;
  }

  selecionarParte() {
    const responsavel = this.resourceForm.get('parte')?.value;
    this.responsavel = responsavel;
    return this.responsavel;
  }

  esconderDialog() {
    this.quesitoDialog = false;
    this.submitted = false;
  }

  cancelar() {
    if (this.quesitoId) {
      this.carregarQuesito(this.laudoId, this.quesitoId);
      this.disabled = false;
      this.resourceForm.disable();
    } else {
      this.limparCampos();
    }
  }

  limparCampos() {
    this.resourceForm.reset();
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

  getExameContext(): string {
    // Lógica para construir o contexto do exame
    const pergunta = this.resourceForm.get('pergunta')?.value;
    return pergunta;
  }

  carregarObjetos(exameId: string) {
    this.objetoService.listar(exameId).subscribe(
      objetos => {
        this.objetos = objetos;
      }
    )
  }

  async carregarExame(laudoId: string): Promise<void> {
    try {
      this.exame = await this.exameService.obterExame(laudoId);
    } catch (error) {
      this.erro.handle(error);
      this.message.showError('Erro!', 'Erro ao carregar o quesito');
    }
  }

  gerarRespostaIA(prompt: string ): void {
    if(!prompt) {
      console.error("Prompt vazio");
      return;
    }

    this.quesitoService.getIAResponse(this.laudoId, prompt)
      .subscribe(response => {
          this.response = response;
          this.resourceForm.patchValue({ resposta: response });
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { MessageComponent } from '../../../components/message/message.component';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { Status } from '../../../model/status';
import { IaService } from '../../../services/ia.service';
import { Quesito } from '../../quesito/shared/quesito.model';
import { LaudoPericial } from '../shared/laudo-pericial';
import { LaudoPericialService } from '../shared/laudo-pericial.service';

@Component({
  selector: 'app-laudo-pericial',
  templateUrl: './laudo-pericial.component.html',
  styleUrls: ['./laudo-pericial.component.css']
})
export class LaudoPericialComponent implements OnInit {

  @Input() laudo = new LaudoPericial();
  laudoId: string = '';
  itens: MenuItem[] = [];
  home?: any;

  fields = [
    {
      label: 'Histórico do Processo',
      prompt: 'Por favor, com base na informação passada {historico}, forneça extritamente o historico',
      fieldName: 'historico'
    },
    {
      label: 'Objetivo',
      prompt: 'Qual é o objetivo deste laudo considerando {objetivo}? Forneça extritamente o objetivo',
      fieldName: 'objetivo'
    },
    {
      label: 'Metodologia Aplicada',
      prompt: 'Descreva a metodologia aplicada no laudo com base em {metodologiaAplicada}. Forneça extritamente a metodologiaAplicada',
      fieldName: 'metodologiaAplicada'
    }
  ];

  processoInserido: boolean = false;
  disabled: boolean = true;
  disabledData: boolean = false;
  edit: boolean = false;

  resourceForm!: FormGroup;

  selectedStatus?: string;

  statusOptions = Status.getOptions();

  constructor(
    private service: LaudoPericialService,
    private iaService: IaService,
    private route: ActivatedRoute,
    private router: Router,
    private error: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private message: MessageComponent
  ) {
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.buildResourceForm();
      if (this.laudoId) {
        this.carregarLaudoPericial(this.laudoId);
      }
    });
    this.itens = [
      {label: 'Exames', routerLink: 'exames'},
      {label: 'Quesitos', routerLink: 'quesitos'}
    ]
  }

  onStatusChange(status: any) {
    console.log('Status Selecionado: ', status);
  }

  private buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [''],
      processo: this.formBuilder.group({
        id: ['', Validators.required],
        numero: ['', Validators.required],
        comarca: [''],
        vara: [''],
        parteAutora: [''],
        parteReu: [''],
        nomeAutor: [''],
        nomeReu: [''],
        assunto: [''],
      }),
      status: [Status.NAO_INICIADO],
      objetivo: [''],
      metodologiaAplicada: [''],
      quesitos: this.formBuilder.array([]),
      historico: [''],
      conclusao: [''],
      introducao: [''],
      dataDoLaudo: [null]
    });
  }

  carregarLaudoPericial(laudoId: string) {
    this.service.buscarPorId(laudoId)
      .then((laudo: LaudoPericial) => {
        this.laudo = laudo;

        const dataDoLaudo = laudo?.dataDoLaudo ? new Date(laudo.dataDoLaudo) : null;

        this.resourceForm.patchValue({
          id: laudo.id,
          status: laudo.status,
          processo: {
            id: laudo.processo?.id,
            numero: laudo.processo?.numero,
            comarca: laudo.processo?.comarca,
            vara: laudo.processo?.vara,
            parteAutora: laudo.processo?.parteAutora,
            parteReu: laudo.processo?.parteReu,
            nomeAutor: laudo.processo?.nomeAutor,
            nomeReu: laudo.processo?.nomeReu,
            assunto: laudo.processo?.assunto,
          },
          quesitos: laudo.quesitos,
          objetivo: laudo.objetivo,
          metodologiaAplicada: laudo.metodologiaAplicada,
          historico: laudo?.historico,
          conclusao: laudo.conclusao,
          introducao: laudo?.introducao,
          dataDoLaudo: dataDoLaudo,
        });

        this.atualizaQuesitos();
        this.resourceForm?.disable();
      })
      .catch(erro => {
        this.error.handle(erro);
        this.message.showError('Erro!', 'Erro ao carregar os detalhes do laudo pericial');
      });
  }

  submitForm() {

    if (this.resourceForm.valid) {
      const formulario = this.resourceForm.value;
      if (!formulario.processo) {
        console.error('Problema com os dados do processo');
        return;
      }

      this.laudo = {
        id: this.laudoId,
        status: formulario.status,
        objetivo: formulario.objetivo,
        metodologiaAplicada: formulario.metodologiaAplicada,
        historico: formulario.historico,
        conclusao: formulario.conclusao,
        introducao: formulario.introducao,
        dataDoLaudo: formulario.dataDoLaudo,
        quesitos: formulario.quesitos,
        processo: {
          id: formulario.processo.id,
          numero: formulario.processo.numero,
          comarca: formulario.processo.comarca,
          vara: formulario.processo.vara,
          parteAutora: formulario.processo.parteAutora,
          parteReu: formulario.processo.parteReu,
          nomeAutor: formulario.processo.nomeAutor,
          nomeReu: formulario.processo.nomeReu,
          assunto: formulario.processo.assunto,
        },
      }

      if (this.laudoId) {
        this.laudo.id = this.laudoId;
        this.atualizar(this.laudo);
        this.edit = false;
      } else {
        this.salvar(this.laudo).then((laudoSalvo) => {
          this.router.navigate(['laudos', laudoSalvo.id, 'edit']);
        })
      }
    } else {
      console.error('Erro ao salvar o laudo');
    }

    this.resourceForm?.markAllAsTouched();

  }

  detalhesDoLaudo(laudoId: string) {
    this.router.navigate(['laudos', laudoId, 'edit']);
  }

  salvar(laudo: LaudoPericial): Promise<LaudoPericial> {
    return new Promise((resolve, reject) => {

      this.service.salvar(laudo)
        .then(laudoSalvo => {
          this.laudoId = laudoSalvo.id!;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Laudo Pericial Salvo',
            life: 3000
          });

          resolve(laudoSalvo);
          this.resourceForm?.disable();
        })
        .catch(erro => {
          this.message.showError('Erro!', 'Erro ao salvar');
          this.error.handle(erro);
          reject(erro);
        });
    });
  }

  atualizaQuesitos() {
    if (this.laudo.quesitos && this.laudo.quesitos.length > 0) {
      this.laudo.quesitos.forEach((quesito: Quesito) => this.addQuesito(quesito));
    }
  }

  atualizar(laudo: LaudoPericial): Promise<LaudoPericial> {
    return new Promise((resolve, reject) => {
      this.service.atualizar(laudo).subscribe(
        (laudoAtualizado: LaudoPericial) => {
          this.messageService.add({
            severity: 'success', summary: 'Sucesso', detail: 'Laudo Atualizado', life: 3000
          });
          this.laudo = laudoAtualizado;
          if (laudo.id) {
            this.carregarLaudoPericial(laudo.id);
          }
          resolve(laudoAtualizado);
        },
        (erro: any) => {
          this.error.handle(erro);
          this.message.showError('Erro!', 'Erro ao atualizar o laudo');
          reject(erro);
        }
      );
    });

  }


  get editando() {
    return Boolean(this.laudo.id);
  }

  cancelar() {
    const camposPreenchidos = ['historico', 'objetivo', 'metodologiaAplicada'];

    if (this.resourceForm) {
      this.resetarCampos(camposPreenchidos);
      this.edit = false;
      this.desabilitarFormulario();
    }
  }

  resetarCampos(campos: string[]) {
    campos.forEach(campo => {
      const formControl = this.resourceForm.get(campo);
      if (formControl && !formControl.value) {
        formControl.reset();
      } else {
        this.carregarLaudoPericial(this.laudoId);
      }

    });
  }

  desabilitarFormulario() {
    this.resourceForm.disable();
  }

  onProcessoSelecionado(processo: any) {

    if (processo) {
      this.resourceForm.get('processo')?.patchValue(processo);
      this.resourceForm.get('processo')?.markAsDirty();
    }
    this.processoInserido = true;
    this.disabled = false;
  }

  getProcesso() {
    if (this.laudoId) {
      const processo = this.resourceForm.get('processo')?.value;
      return processo;
    }
  }

  editar() {
    if (this.resourceForm) {
      this.edit = true;
      this.resourceForm.enable();
    }
  }

  addQuesito(quesito?: Quesito) {
    const quesitosFormArray = this.resourceForm.get('quesitos') as FormArray;
    const quesitoFormGroup = this.formBuilder.group({
      id: [quesito ? quesito.id : ''],
      pergunta: [quesito ? quesito.pergunta : '', Validators.required],
      resposta: [quesito ? quesito.resposta : '']
    });
    quesitosFormArray.push(quesitoFormGroup);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { LaudoPericial } from '../shared/laudo-pericial';
import { ActivatedRoute, Router } from '@angular/router';
import { LaudoPericialService } from '../shared/laudo-pericial.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../model/status';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { MessageComponent } from '../../../components/message/message.component';

@Component({
  selector: 'app-dados-laudo',
  templateUrl: './dados-laudo.component.html',
  styleUrl: './dados-laudo.component.css'
})
export class DadosLaudoComponent implements OnInit {

  @Input() laudo = new LaudoPericial();
  laudoId: string = '';
  edit: boolean = false;
  processoInserido: boolean = false;
  disabled: boolean = false;
  statusOptions = Status.getOptions();
  resourceForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private error: ErrorHandlerService,
    private message: MessageComponent,
    private service: LaudoPericialService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.buildResourceForm();
      if (this.laudoId) {
        this.carregarLaudoPericial(this.laudoId);
      }
    });
  }

  buildResourceForm() {
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
          dataDoLaudo: dataDoLaudo
        });

        this.resourceForm?.disable();
      })
      .catch(erro => {
        this.error.handle(erro);
        this.message.showError('Erro!', 'Erro ao carregar os detalhes do laudo');
      });
  }

  submitForm() {
    if (this.resourceForm.valid) {
      const formulario = this.resourceForm.value;
      if (!formulario.processo) {
        this.message.showError('Erro!', 'Problema com os dados do processo');
        return;
      }

      this.laudo = {
        id: this.laudoId,
        status: formulario.status,
        dataDoLaudo: formulario.dataDoLaudo,
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
        this.salvar(this.laudo)
          .then((laudoSalvo) => {
            this.router.navigate(['laudos', laudoSalvo.id, 'edit']);
          })
      }
    } else {
      this.message.showError('Erro!', 'Erro ao salvar o laudo');
    }
    this.resourceForm?.markAllAsTouched();
  }

  salvar(laudo: LaudoPericial): Promise<LaudoPericial> {
    return new Promise((resolve, reject) => {
      this.service.salvar(laudo)
        .then(laudoSalvo => {
          this.laudoId = laudoSalvo.id!
          this.message.showMessage('Sucesso!', 'Laudo pericial salvo');
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

  atualizar(laudo: LaudoPericial): Promise<LaudoPericial> {
    return new Promise((resolve, reject) => {
      this.service.atualizar(laudo).subscribe(
        (laudoAtualizado: LaudoPericial) => {
          this.message.showMessage('Sucesso', 'Laudo atualizado');
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

  editar() {
    if (this.resourceForm) {
      this.edit = true;
      this.resourceForm.enable();
    }
  }

  getProcesso() {
    if (this.laudoId) {
      const processo = this.resourceForm.get('processo')?.value;
      return processo;
    }
  }

  onProcessoSelecionado(processo: any) {

    if (processo) {
      this.resourceForm.get('processo')?.patchValue(processo);
      this.resourceForm.get('processo')?.markAsDirty();
    }
    this.processoInserido = true;
    this.disabled = true;
  }
}

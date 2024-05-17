import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { LaudoPericial } from '../shared/laudo-pericial';
import { LaudoPericialService } from '../shared/laudo-pericial.service';

@Component({
  selector: 'app-laudo-pericial',
  templateUrl: './laudo-pericial.component.html',
  styleUrls: ['./laudo-pericial.component.css']
})
export class LaudoPericialComponent implements OnInit {

  laudoPericial: LaudoPericial = new LaudoPericial();
  laudoId: string = '';

  processoInserido: boolean = false;

  /*
  metodologia: string = '';
  historico: string = '';
  conclusao: string = '';
  introducao: string = '';
  */
  resourceForm!: FormGroup;

  constructor(
    private service: LaudoPericialService,
    private route: ActivatedRoute,
    private router: Router,
    private error: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
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
      objetivo: [''],
      metodologiaAplicada: [''], //metodologiaAplicada
      // exameDaMateria: this.formBuilder.group({
      //   id: [''],
      //   objetos: this.formBuilder.array([
      //     {id: [''], exameDaMateriaId: [''], documento: ['']}
      //   ]),
      // }),

      historico: [''],
      conclusao: [''],
      introducao: [''],
      dataDoLaudo: [null]
      //quesitos
    });
  }

  carregarLaudoPericial(laudoId: string) {
    this.service.buscarPorId(laudoId)
      .then((laudo: LaudoPericial) => {
        this.laudoPericial = laudo;
        this.resourceForm.patchValue({
          id: laudo.id,
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
          objetivo: laudo.objetivo,
          metodologiaAplicada: laudo.metodologiaAplicada,
          historico: laudo.historico,
          conclusao: laudo.conclusao,
          introducao: laudo.introducao,
          dataDoLaudo: laudo.dataDoLaudo,
          // exameDaMateria: laudo.exameDaMateria,
          //quesitos: laudo.quesitos,
        });
        this.resourceForm?.disable();
      })
      .catch(erro => {
        this.error.handle(erro);
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Erro!',
            detail: 'Erro ao carregar os detalhes do laudo pericial',
            life: 3000
          });
      })
  }

  submitForm() {

    this.resourceForm?.markAllAsTouched();

    if (this.resourceForm?.valid && this.processoInserido) {
      const formulario = this.resourceForm.value;

      console.log('Resource válido: ', this.resourceForm.valid);

      if (!formulario.processo) {
        console.error('Problema com os dados do processo');
        return;
      }
      // this.processoInserido = true;

      this.laudoPericial = {
        id: formulario.id,
        objetivo: formulario.objetivo,
        metodologiaAplicada: formulario.metodologiaAplicada,
        historico: formulario.historico,
        conclusao: formulario.conclusao,
        introducao: formulario.introducao,
        dataDoLaudo: formulario.dataDoLaudo,
        // exameDaMateria: formulario.exameDaMateria,
        //quesitos, dataDoLaudo, objetos ??
        processo: {
          // ...formulario.processo
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

      if (this.editando) {
        this.laudoPericial.id = this.laudoId;
        this.atualizar(this.laudoPericial);
      } else {
        this.salvar(this.laudoPericial)
          .then((laudoSalvo) => {
            this.detalhesDoLaudo(laudoSalvo.id!);
          });
        this.processoInserido = true;
      }
    }

  }

  detalhesDoLaudo(laudoId: string) {
    this.router.navigate(['laudos', laudoId, 'edit']);
  }

  salvar(laudo: LaudoPericial): Promise<LaudoPericial> {
    return new Promise((resolve, reject) => {

      this.service.salvar(laudo)
        .then((laudoSalvo) => {
          this.laudoPericial = laudoSalvo;

          this.messageService.add(
            {
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Exame Salvo',
              life: 3000
            });

          resolve(laudoSalvo);

        })
        .catch(erro => {
          this.error.handle(erro);
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Erro!',
              detail: 'Erro ao Salvar',
              life: 3000
            });
          reject(erro);
        });
    })
  }

  atualizar(laudo: LaudoPericial) {
    throw new Error('Method not implemented.');
  }


  get editando() {
    return Boolean(this.laudoPericial.id);
  }

  cancelar() {
    this.resourceForm?.reset();
  }

  onProcessoSelecionado(processo: any) {

    if (processo) {
      this.resourceForm.get('processo')?.patchValue(processo);
      this.resourceForm.get('processo')?.markAsDirty();
    }
    this.processoInserido = true;

    console.log('Dados do Processo: ', processo);
  }

  getProcesso() {
    if (this.laudoId) {
      const processo = this.resourceForm.get('processo')?.value;
      return processo;
    }
  }

}

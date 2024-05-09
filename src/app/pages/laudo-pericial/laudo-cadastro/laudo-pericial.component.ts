import { Processo } from './../../processos/shared/processo.model';
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
      processo: ['', Validators.required],
      introducao: ['', Validators.required],
      metodologiaAplicada: ['', Validators.required], //metodologiaAplicada
      historico: ['', Validators.required],
      conclusao: ['', Validators.required],
      objetivo: ['', Validators.required]
      //outros atributos de LP
    });
  }

  carregarLaudoPericial(laudoId: string) {
    this.service.buscarPorId(laudoId)
      .then((laudo: LaudoPericial) => {
        this.laudoPericial = laudo;
        this.resourceForm.patchValue({
          id: laudo.id,
          processo: laudo.processo,
          introducao: laudo.introducao,
          metodologiaAplicada: laudo.metodologiaAplicada,
          historico: laudo.historico,
          conclusao: laudo.conclusao,
          objetivo: laudo.objetivo
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

    if(this.resourceForm && this.resourceForm.valid) {
      const formulario = this.resourceForm.value;

      this.laudoPericial = {
        processo: formulario.processo.processo,
        introducao: formulario.introducao,
        metodologiaAplicada: formulario.metodologiaAplicada,
        historico: formulario.historico,
        conclusao: formulario.conclusao,
        objetivo: formulario.objetivo
      }

      if (this.editando) {
        this.laudoPericial.id = this.laudoId;
        this.atualizar(this.laudoPericial);
      } else {
        this.salvar(this.laudoPericial)
          .then((laudoSalvo) => {
            this.detalhesDoLaudo(laudoSalvo.id!);
          })
      }
    }


    this.resourceForm?.markAllAsTouched();
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
}

import { Component, OnInit } from '@angular/core';
import { LaudoPericial } from '../shared/laudo-pericial';
import { ActivatedRoute } from '@angular/router';
import { LaudoPericialService } from '../shared/laudo-pericial.service';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/error-handler.service';

@Component({
  selector: 'app-laudo-pericial',
  templateUrl: './laudo-pericial.component.html',
  styleUrl: './laudo-pericial.component.css'
})
export class LaudoPericialComponent implements OnInit {

  laudoPericial: LaudoPericial = new LaudoPericial();

  constructor(
    private laudoPericialService: LaudoPericialService,
    private route: ActivatedRoute,
    private error: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    const codigoLaudo = this.route.snapshot.params['id'];

    if (codigoLaudo) {
      this.carregarLaudoPericial(codigoLaudo);
    }
  }
  carregarLaudoPericial(codigoLaudo: string) {
    //TODO: Implementar o restante do método
    alert('Laudo Pericial')
  }

  salvarLaudo(laudoForm: NgForm) {
    if (this.editando) {
      this.atualizar(laudoForm);
    } else {
      this.adicionar(laudoForm);
    }
  }
  adicionar(laudoForm: NgForm) {
    this.laudoPericialService.adicionar(this.laudoPericial)
      .then(() => {
        //implementar mensagem toast
        laudoForm.reset();
        this.laudoPericial = new LaudoPericial();
      })
      .catch(erro => this.error.handle(erro));
  }
  atualizar(laudoForm: NgForm) {
    throw new Error('Method not implemented.');
  }

  get editando() {
    return Boolean(this.laudoPericial.id);
  }
}

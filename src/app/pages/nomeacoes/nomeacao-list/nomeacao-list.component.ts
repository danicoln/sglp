import { Component, OnInit } from '@angular/core';
import { NomeacaoService } from '../shared/nomeacao.service';
import { Nomeacao } from '../shared/nomeacao.model';
import { ErrorHandlerService } from '../../../core/error-handler.service';

@Component({
  selector: 'app-nomeacao-list',
  templateUrl: './nomeacao-list.component.html',
  styleUrl: './nomeacao-list.component.css'
})
export class NomeacaoListComponent implements OnInit {

  nomeacoes!: Nomeacao[];

  constructor(
    private nomeacaoService: NomeacaoService,
    private error: ErrorHandlerService
  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listar() {
    this.nomeacaoService.listar()
      .then((dados) => this.nomeacoes = dados)
      .catch(erro => this.error.handle(erro));
  }

}

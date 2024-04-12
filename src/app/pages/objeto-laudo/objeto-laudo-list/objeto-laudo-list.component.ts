import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ObjetoLaudo } from '../shared/objeto-laudo.model';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ObjetoLaudoService } from '../shared/objeto-laudo.service';

@Component({
  selector: 'app-objeto-laudo-list',
  templateUrl: './objeto-laudo-list.component.html',
  styleUrl: './objeto-laudo-list.component.css'
})
export class ObjetoLaudoListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;

  @Input() titulo: string = 'Título Exemplo';

  objeto = new ObjetoLaudo();
  objetos!: ObjetoLaudo[];
  objetosSelecionados!: ObjetoLaudo[] | null;

  constructor(
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private objetoService: ObjetoLaudoService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.objetoService.listar()
      .subscribe(
        (objetos: ObjetoLaudo[]) => {
          this.objetos = objetos;
        },
        erro => {
          this.handleError(erro);
        }
      );
  }

  deletarObjetosSelecionados() {
    throw new Error('Method not implemented.');
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  deletar(obj: ObjetoLaudo) {
    throw new Error('Method not implemented.');
    }
    editar(obj: ObjetoLaudo) {
    throw new Error('Method not implemented.');
    }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.msgService.add(
      ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao carregar os objetos. Por favor, tente novamente mais tarde.' })
    )
  }
}

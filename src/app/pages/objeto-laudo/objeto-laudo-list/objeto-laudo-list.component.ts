import { Component, Input } from '@angular/core';
import { ObjetoLaudo } from '../shared/objeto-laudo.model';

@Component({
  selector: 'app-objeto-laudo-list',
  templateUrl: './objeto-laudo-list.component.html',
  styleUrl: './objeto-laudo-list.component.css'
})
export class ObjetoLaudoListComponent {

  @Input() titulo: string = 'Título Exemplo';

  objetoLaudo = new ObjetoLaudo();
  objetos!: ObjetoLaudo[];
  objetoSelecionado!: ObjetoLaudo[] | null;
}

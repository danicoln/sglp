import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-objeto-laudo-list',
  templateUrl: './objeto-laudo-list.component.html',
  styleUrl: './objeto-laudo-list.component.css'
})
export class ObjetoLaudoListComponent {

  @Input() titulo: string = 'Título Exemplo'
}

import { NgModule } from '@angular/core';

import { ExameDaMateriaRoutingModule } from './exame-da-materia-routing.module';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameHomeComponent } from './exame-home/exame-home.component';
import { ExameListComponent } from './exame-list/exame-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ObjetoLaudoModule } from '../objeto-laudo/objeto-laudo.module';


@NgModule({
  declarations: [
    ExameListComponent,
    ExameFormComponent,
    ExameHomeComponent
  ],
  imports: [
    ExameDaMateriaRoutingModule,
    SharedModule,
    ObjetoLaudoModule

  ],
  exports: [
    ExameListComponent,
    ExameFormComponent,
    ExameHomeComponent
  ]
})
export class ExameDaMateriaModule { }

import { NgModule } from '@angular/core';
import { LaudoPericialComponent } from './laudo-cadastro/laudo-pericial.component';
import { LaudoPericialRoutingModule } from './laudo-pericial-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { ExameDaMateriaModule } from '../exame-da-materia/exame-da-materia.module';
import { QuesitoModule } from '../quesito/quesito.module';
import { DadosLaudoComponent } from './dados-laudo/dados-laudo.component';
import { LaudoFormComponent } from './laudo-form/laudo-form.component';
import { LaudoListComponent } from './laudo-list/laudo-list.component';


@NgModule({
  declarations: [
    LaudoPericialComponent,
    LaudoListComponent,
    LaudoFormComponent,
    DadosLaudoComponent
  ],
  imports: [
    SharedModule,
    LaudoPericialRoutingModule,
    ExameDaMateriaModule,
    QuesitoModule
    // ObjetoLaudoModule,
    // AdvogadoModule,

  ],
  exports: [
    LaudoPericialComponent,
    LaudoListComponent,
    LaudoFormComponent,
    DadosLaudoComponent
  ],
})
export class LaudoPericialModule { }

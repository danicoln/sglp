import { NgModule } from '@angular/core';
import { LaudoPericialComponent } from './laudo-cadastro/laudo-pericial.component';
import { LaudoPericialRoutingModule } from './laudo-pericial-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { LaudoListComponent } from './laudo-list/laudo-list.component';
import { ObjetoLaudoModule } from '../objeto-laudo/objeto-laudo.module';


@NgModule({
  declarations: [
    LaudoPericialComponent,
    LaudoListComponent
  ],
  imports: [
    SharedModule,
    LaudoPericialRoutingModule,
    ObjetoLaudoModule

  ],
  exports: [
    LaudoPericialComponent,
    LaudoListComponent
  ]
})
export class LaudoPericialModule { }

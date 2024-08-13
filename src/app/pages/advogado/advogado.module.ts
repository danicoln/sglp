import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdvogadoFormComponent } from './advogado-form/advogado-form.component';
import { AdvogadoListComponent } from './advogado-list/advogado-list.component';
import { AdvogadoRoutingModule } from './advogado-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AdvogadoFormComponent,
    AdvogadoListComponent
  ],
  imports: [
    CommonModule,
    AdvogadoRoutingModule,
    SharedModule,
    CardModule
  ],
  exports: [
    AdvogadoFormComponent,
    AdvogadoListComponent
  ]
})
export class AdvogadoModule { }

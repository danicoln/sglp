import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjetoLaudoRoutingModule } from './objeto-laudo-routing.module';
import { ObjetoLaudoFormComponent } from './objeto-laudo-form/objeto-laudo-form.component';
import { DocumentosModule } from '../documentos/documentos.module';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ObjetoLaudoListComponent } from './objeto-laudo-list/objeto-laudo-list.component';


@NgModule({
  declarations: [
    ObjetoLaudoFormComponent,
    ObjetoLaudoListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CommonModule,
    DocumentosModule,
    CardModule,
    CalendarModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,

    ObjetoLaudoRoutingModule,
  ],
  exports: [
    ObjetoLaudoFormComponent
  ]
})
export class ObjetoLaudoModule { }

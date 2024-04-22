import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { DocumentosModule } from '../documentos/documentos.module';
import { ObjetoLaudoFormComponent } from './objeto-laudo-form/objeto-laudo-form.component';
import { ObjetoLaudoListComponent } from './objeto-laudo-list/objeto-laudo-list.component';
import { ObjetoLaudoRoutingModule } from './objeto-laudo-routing.module';


@NgModule({
  declarations: [
    ObjetoLaudoFormComponent,
    ObjetoLaudoListComponent
  ],
  imports: [
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarModule,
    TableModule,
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
    DialogModule,
    ConfirmDialogModule,

    ObjetoLaudoRoutingModule,

  ],
  exports: [
    ObjetoLaudoFormComponent,
    ObjetoLaudoListComponent
  ]
})
export class ObjetoLaudoModule { }

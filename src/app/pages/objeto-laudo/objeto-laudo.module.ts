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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


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

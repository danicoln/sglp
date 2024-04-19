import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExameDaMateriaRoutingModule } from './exame-da-materia-routing.module';
import { ExameListComponent } from './exame-list/exame-list.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ObjetoLaudoModule } from '../objeto-laudo/objeto-laudo.module';


@NgModule({
  declarations: [
    ExameListComponent,
    ExameFormComponent
  ],
  imports: [
    CommonModule,
    ExameDaMateriaRoutingModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    RouterModule,
    SharedModule,
    CardModule,
    CalendarModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    DialogModule,
    ConfirmDialogModule,

    ObjetoLaudoModule
  ],
  exports: [
    ExameListComponent,
    ExameFormComponent
  ]
})
export class ExameDaMateriaModule { }

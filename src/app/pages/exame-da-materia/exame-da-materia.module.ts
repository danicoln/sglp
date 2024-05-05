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
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { ObjetoLaudoModule } from '../objeto-laudo/objeto-laudo.module';
import { ExameDaMateriaRoutingModule } from './exame-da-materia-routing.module';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameHomeComponent } from './exame-home/exame-home.component';
import { ExameListComponent } from './exame-list/exame-list.component';


@NgModule({
  declarations: [
    ExameListComponent,
    ExameFormComponent,
    ExameHomeComponent
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
    TabMenuModule,
    TabViewModule,

    ObjetoLaudoModule,


  ],
  exports: [
    ExameListComponent,
    ExameFormComponent,
    ExameHomeComponent
  ]
})
export class ExameDaMateriaModule { }

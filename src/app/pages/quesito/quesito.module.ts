import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuesitoRoutingModule } from './quesito-routing.module';
import { QuesitoFormComponent } from './quesito-form/quesito-form.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from '../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { QuesitoListComponent } from './quesito-list/quesito-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    QuesitoFormComponent,
    QuesitoListComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    QuesitoRoutingModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    ToolbarModule,
    TableModule
  ],

  exports: [
    QuesitoFormComponent,
    QuesitoListComponent
  ]
})
export class QuesitoModule { }

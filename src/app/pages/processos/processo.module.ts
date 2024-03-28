import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessoRoutingModule } from './processo-routing.module';
import { ProcessoListComponent } from './processo-list/processo-list.component';
import { ProcessoComponent } from './processo-form/processo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ProcessoComponent,
    ProcessoListComponent
  ],
  imports: [
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    CardModule,
    FieldsetModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,

    ProcessoRoutingModule
  ],

  exports: [
    ProcessoComponent,
    ProcessoListComponent
  ]
})
export class ProcessoModule { }

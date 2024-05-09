import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaudoPericialComponent } from './laudo-cadastro/laudo-pericial.component';
import { LaudoPericialRoutingModule } from './laudo-pericial-routing.module';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { LaudoListComponent } from './laudo-list/laudo-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProcessoModule } from '../processos/processo.module';
import { ObjetoLaudoModule } from '../objeto-laudo/objeto-laudo.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LaudoPericialComponent,
    LaudoListComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    CardModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    FileUploadModule,
    TagModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,

    ProcessoModule,
    ObjetoLaudoModule,
    LaudoPericialRoutingModule,


  ],
  exports: [
    LaudoPericialComponent,
    LaudoListComponent
  ]
})
export class LaudoPericialModule { }

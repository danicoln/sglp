import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosFormComponent } from './documentos-form/documentos-form.component';
import { DocumentosListComponent } from './documentos-list/documentos-list.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    DocumentosFormComponent,
    DocumentosListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    DocumentosRoutingModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule
  ],
  exports: [
    DocumentosFormComponent,
    DocumentosListComponent
  ]
})
export class DocumentosModule { }

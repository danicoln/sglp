import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { DropdownModule } from 'primeng/dropdown';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { ObjetivoComponent } from '../components/objetivo/objetivo.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProcessoAutocompleteComponent } from '../components/autocompletes/processo-autocomplete/processo-autocomplete.component';


@NgModule({
  declarations: [
    ObjetivoComponent,
    DropdownComponent,
    ProcessoAutocompleteComponent,

  ],
  imports: [

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
    AutoCompleteModule,

  ],
  exports: [
    ObjetivoComponent,
    DropdownComponent,
    ProcessoAutocompleteComponent
  ]
})
export class SharedModule { }

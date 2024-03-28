import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomeacoesRoutingModule } from './nomeacoes-routing.module';
import { NomeacaoFormComponent } from './nomeacao-form/nomeacao-form.component';
import { NomeacaoListComponent } from './nomeacao-list/nomeacao-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ProcessoModule } from '../processos/processo.module';
import { FieldsetModule } from 'primeng/fieldset';


@NgModule({
  declarations: [
    NomeacaoFormComponent,
    NomeacaoListComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NomeacoesRoutingModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    CalendarModule,
    FieldsetModule,

    ProcessoModule
  ],

  exports: [
    NomeacaoFormComponent,
    NomeacaoListComponent
  ]
})
export class NomeacoesModule { }

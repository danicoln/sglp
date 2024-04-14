import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from './error-handler.service';
import { LaudoPericialService } from '../pages/laudo-pericial/shared/laudo-pericial.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ParteService } from '../services/parte.service';
import { ProcessoService } from '../pages/processos/shared/processo.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],

  exports: [
  ],
  providers: [
    ErrorHandlerService,
    LaudoPericialService,
    MessageService,
    ConfirmationService,
    ParteService,
    ProcessoService,

    DatePipe
  ]
})
export class CoreModule { }

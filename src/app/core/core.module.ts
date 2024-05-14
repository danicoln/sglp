import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { LaudoPericialService } from '../pages/laudo-pericial/shared/laudo-pericial.service';
import { ProcessoService } from '../pages/processos/shared/processo.service';
import { ParteService } from '../services/parte.service';
import { ErrorHandlerService } from './error-handler.service';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TabMenuModule,
    PanelMenuModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    FontAwesomeModule,
    StepsModule,
    CardModule,
    FieldsetModule,
    RouterModule,
    FileUploadModule,
    CalendarModule,
    PanelModule
  ],

  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TabMenuModule,
    PanelMenuModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    FontAwesomeModule,
    StepsModule,
    CardModule,
    FieldsetModule,
    RouterModule,
    FileUploadModule,
    CalendarModule,
    PanelModule,

    HeaderComponent,
    SidebarComponent
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

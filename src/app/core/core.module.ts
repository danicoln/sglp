import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { HeaderComponent } from '../components/header/header.component';
import { MegaMenuComponent } from '../components/mega-menu/mega-menu.component';
import { MessageComponent } from '../components/message/message.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { LaudoPericialService } from '../pages/laudo-pericial/shared/laudo-pericial.service';
import { ProcessoService } from '../pages/processos/shared/processo.service';
import { IaService } from '../services/ia.service';
import { ParteService } from '../services/parte.service';
import { DateUtilService } from '../utils/date-utils';
import { ErrorHandlerService } from './error-handler.service';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MegaMenuComponent

  ],
  imports: [
    RouterModule,
    FormsModule,
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
    MegaMenuModule
    
  ],

  exports: [
    RouterModule,
    FormsModule,
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
    MegaMenuModule,

    HeaderComponent,
    SidebarComponent,
    MegaMenuComponent
  ],

  providers: [
    ErrorHandlerService,
    LaudoPericialService,
    MessageService,
    MessageComponent,
    ConfirmationService,
    ParteService,
    ProcessoService,
    IaService,
    DateUtilService,

    DatePipe
  ]
})
export class CoreModule { }

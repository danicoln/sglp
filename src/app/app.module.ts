import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';

import { CalendarModule } from 'primeng/calendar';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CoreModule } from './core/core.module';
import { DocumentosModule } from './pages/documentos/documentos.module';
import { ExameDaMateriaModule } from './pages/exame-da-materia/exame-da-materia.module';
import { LaudoPericialModule } from './pages/laudo-pericial/laudo-pericial.module';
import { NomeacoesModule } from './pages/nomeacoes/nomeacoes.module';
import { ProcessoModule } from './pages/processos/processo.module';
import { QuesitoModule } from './pages/quesito/quesito.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabMenuModule,
    PanelMenuModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    FontAwesomeModule,
    SharedModule,
    CoreModule,
    CardModule,
    FieldsetModule,
    RouterModule,
    FileUploadModule,
    CalendarModule,

    LaudoPericialModule,
    ProcessoModule,
    NomeacoesModule,
    DocumentosModule,
    ExameDaMateriaModule,
    QuesitoModule,

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

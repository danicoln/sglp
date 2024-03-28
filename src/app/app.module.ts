import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LaudoPericialModule } from './pages/laudo-pericial/laudo-pericial.module';
import { ProcessoModule } from './pages/processos/processo.module';
import { NomeacoesModule } from './pages/nomeacoes/nomeacoes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent

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

    LaudoPericialModule,
    ProcessoModule,
    NomeacoesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

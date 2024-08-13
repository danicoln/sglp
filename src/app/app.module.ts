import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DocumentosModule } from './pages/documentos/documentos.module';
import { ExameDaMateriaModule } from './pages/exame-da-materia/exame-da-materia.module';
import { LaudoPericialModule } from './pages/laudo-pericial/laudo-pericial.module';
import { NomeacoesModule } from './pages/nomeacoes/nomeacoes.module';
import { ObjetoLaudoModule } from './pages/objeto-laudo/objeto-laudo.module';
import { ProcessoModule } from './pages/processos/processo.module';
import { QuesitoModule } from './pages/quesito/quesito.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxMaskDirective,
    AppRoutingModule,
    CoreModule,
    InputNumberModule,
    SidebarModule,
    ObjetoLaudoModule,
    ProcessoModule,
    NomeacoesModule,
    DocumentosModule,
    // ExameDaMateriaModule,
    QuesitoModule,
    DashboardModule
  ],
  providers: [provideEnvironmentNgxMask(maskConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }

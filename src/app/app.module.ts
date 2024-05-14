import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LaudoPericialModule } from './pages/laudo-pericial/laudo-pericial.module';
import { ObjetoLaudoModule } from './pages/objeto-laudo/objeto-laudo.module';
import { ProcessoModule } from './pages/processos/processo.module';
import { NomeacoesModule } from './pages/nomeacoes/nomeacoes.module';
import { DocumentosModule } from './pages/documentos/documentos.module';
import { ExameDaMateriaModule } from './pages/exame-da-materia/exame-da-materia.module';
import { QuesitoModule } from './pages/quesito/quesito.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    CoreModule,

    ObjetoLaudoModule,
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

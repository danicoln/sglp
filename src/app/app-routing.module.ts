import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  //TODO: implementar:
  /*
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    */
   
   { path: 'dashboard', component:DashboardComponent },
   { path: 'laudos', loadChildren: () => import('./pages/laudo-pericial/laudo-pericial.module').then(m => m.LaudoPericialModule) },
   { path: 'advogados', loadChildren: () => import('./pages/advogado/advogado.module').then(m => m.AdvogadoModule) },
   { path: 'exames', loadChildren: () => import('./pages/exame-da-materia/exame-da-materia.module').then(m => m.ExameDaMateriaModule) },
   { path: 'nomeacoes', loadChildren: () => import('./pages/nomeacoes/nomeacoes.module').then(m => m.NomeacoesModule) },
   { path: 'objetos', loadChildren: () => import('./pages/objeto-laudo/objeto-laudo.module').then(m => m.ObjetoLaudoModule) },
   { path: 'processos', loadChildren: () => import('./pages/processos/processo.module').then(m => m.ProcessoModule) },
   { path: 'quesitos', loadChildren: () => import('./pages/quesito/quesito.module').then(m => m.QuesitoModule) },
   { path: '**', redirectTo: 'pagina-nao-encontrada' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

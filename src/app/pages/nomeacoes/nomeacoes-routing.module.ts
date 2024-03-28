import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NomeacaoListComponent } from './nomeacao-list/nomeacao-list.component';
import { NomeacaoFormComponent } from './nomeacao-form/nomeacao-form.component';

const routes: Routes = [
  { path: 'nomeacoes', component: NomeacaoListComponent },
  { path: 'nomeacoes/novo', component: NomeacaoFormComponent },
  { path: 'editar/:id', component: NomeacaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomeacoesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NomeacaoListComponent } from './nomeacao-list/nomeacao-list.component';
import { NomeacaoFormComponent } from './nomeacao-form/nomeacao-form.component';

const routes: Routes = [
  { path: '', component: NomeacaoListComponent },
  { path: 'novo', component: NomeacaoFormComponent },
  { path: ':id/edit', component: NomeacaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomeacoesRoutingModule { }

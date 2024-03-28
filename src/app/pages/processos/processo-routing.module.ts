import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessoListComponent } from './processo-list/processo-list.component';
import { ProcessoComponent } from './processo-form/processo.component';

const routes: Routes = [
  { path: 'processos', component: ProcessoListComponent },
  { path: 'processos/novo', component: ProcessoComponent },
  { path: 'editar/:id', component: ProcessoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessoRoutingModule { }

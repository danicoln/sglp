import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessoListComponent } from './processo-list/processo-list.component';
import { ProcessoComponent } from './processo-form/processo.component';

const routes: Routes = [
  { path: '', component: ProcessoListComponent },
  { path: 'novo', component: ProcessoComponent },
  { path: ':id/edit', component: ProcessoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessoRoutingModule { }

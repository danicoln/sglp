import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameListComponent } from './exame-list/exame-list.component';

const routes: Routes = [
  { path: '', component: ExameListComponent },
  { path: 'novo', component: ExameFormComponent },
  { path: ':exameId/edit', component: ExameFormComponent },
  // { path: ':exameId/edit/objetos', component: ObjetoLaudoListComponent },
  // { path: ':exameId/edit/objetos/novo', component: ObjetoLaudoFormComponent },
  // { path: ':exameId/edit/objetos/:objetoId/edit', component: ObjetoLaudoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameDaMateriaRoutingModule { }

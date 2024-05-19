import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaudoPericialComponent } from './laudo-cadastro/laudo-pericial.component';
import { LaudoListComponent } from './laudo-list/laudo-list.component';
import { ExameListComponent } from '../exame-da-materia/exame-list/exame-list.component';
import { ExameFormComponent } from '../exame-da-materia/exame-form/exame-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'laudos', pathMatch: 'full' },
  { path: 'laudos', component: LaudoListComponent },
  { path: 'laudos/novo', component: LaudoPericialComponent },
  { path: 'laudos/:id/edit', component: LaudoPericialComponent },
  { path: 'laudos/:id/edit/exames', component: ExameListComponent },
  { path: 'laudos/:id/edit/exames/novo', component: ExameFormComponent },
  { path: 'laudos/:id/edit/exames/:id/edit', component: ExameFormComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class LaudoPericialRoutingModule { }

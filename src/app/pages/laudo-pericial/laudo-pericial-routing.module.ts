import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaudoPericialComponent } from './laudo-cadastro/laudo-pericial.component';
import { LaudoFormComponent } from './laudo-form/laudo-form.component';
import { LaudoListComponent } from './laudo-list/laudo-list.component';
import { ExameListComponent } from '../exame-da-materia/exame-list/exame-list.component';
import { ExameFormComponent } from '../exame-da-materia/exame-form/exame-form.component';

const routes: Routes = [
  { path: '', component: LaudoListComponent },
  { path: 'novo', component: LaudoPericialComponent },
  { path: ':id/edit', component: LaudoFormComponent},
  { path: 'exames', component: ExameListComponent },
  { path: 'exames/novo', component: ExameFormComponent },
  { path: 'exames/:exameId/edit', component: ExameFormComponent },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class LaudoPericialRoutingModule { }

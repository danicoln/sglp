import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetoLaudoFormComponent } from '../objeto-laudo/objeto-laudo-form/objeto-laudo-form.component';
import { ObjetoLaudoListComponent } from '../objeto-laudo/objeto-laudo-list/objeto-laudo-list.component';
import { ExameFormComponent } from './exame-form/exame-form.component';
import { ExameListComponent } from './exame-list/exame-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'exames', pathMatch: 'full' },
  { path: 'exames', component: ExameListComponent },
  { path: 'exames/novo', component: ExameFormComponent },
  { path: 'exames/:id/edit', component: ExameFormComponent },
  { path: 'exames/:id/edit/objetos', component: ObjetoLaudoListComponent },
  { path: 'exames/:id/edit/objetos/novo', component: ObjetoLaudoFormComponent },
  { path: 'exames/:id/edit/objetos/:id/edit', component: ObjetoLaudoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameDaMateriaRoutingModule { }

import { ExameListComponent } from './exame-list/exame-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExameFormComponent } from './exame-form/exame-form.component';

const routes: Routes = [
  { path: 'exames', component: ExameListComponent },
  { path: 'exames/novo', component: ExameFormComponent },
  { path: 'exames/:id/edit', component: ExameFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameDaMateriaRoutingModule { }

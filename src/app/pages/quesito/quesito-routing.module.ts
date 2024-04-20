import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuesitoFormComponent } from './quesito-form/quesito-form.component';

const routes: Routes = [
  { path: 'quesitos/novo', component: QuesitoFormComponent },
  { path: 'editar/:id', component: QuesitoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuesitoRoutingModule { }

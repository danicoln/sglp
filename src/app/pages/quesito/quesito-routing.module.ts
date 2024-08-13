import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuesitoFormComponent } from './quesito-form/quesito-form.component';
import { QuesitoListComponent } from './quesito-list/quesito-list.component';

const routes: Routes = [
  { path: '', component: QuesitoListComponent },
  { path: 'novo', component: QuesitoFormComponent },
  { path: ':id/edit', component: QuesitoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuesitoRoutingModule { }

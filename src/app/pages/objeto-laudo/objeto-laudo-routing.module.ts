import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetoLaudoFormComponent } from './objeto-laudo-form/objeto-laudo-form.component';
import { ObjetoLaudoListComponent } from './objeto-laudo-list/objeto-laudo-list.component';

const routes: Routes = [
  { path: 'objetos', component: ObjetoLaudoListComponent },
  { path: 'objetos/novo', component: ObjetoLaudoFormComponent },
  { path: 'edit/:id', component: ObjetoLaudoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetoLaudoRoutingModule { }

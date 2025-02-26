import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetoLaudoFormComponent } from './objeto-laudo-form/objeto-laudo-form.component';
import { ObjetoLaudoListComponent } from './objeto-laudo-list/objeto-laudo-list.component';

const routes: Routes = [
  { path: '', component: ObjetoLaudoListComponent },
  { path: 'novo', component: ObjetoLaudoFormComponent },
  { path: ':objetoId/edit', component: ObjetoLaudoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetoLaudoRoutingModule { }

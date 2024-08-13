import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvogadoFormComponent } from './advogado-form/advogado-form.component';
import { AdvogadoListComponent } from './advogado-list/advogado-list.component';

const routes: Routes = [
  { path: '', component: AdvogadoListComponent },
  { path: 'novo', component: AdvogadoFormComponent },
  { path: ':advogadoId/edit', component: AdvogadoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvogadoRoutingModule { }

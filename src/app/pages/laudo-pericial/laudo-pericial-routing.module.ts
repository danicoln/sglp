import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaudoPericialComponent } from './laudo-cadastro/laudo-pericial.component';
import { LaudoListComponent } from './laudo-list/laudo-list.component';

const routes: Routes = [
  { path: 'laudos', component: LaudoListComponent },
  { path: 'laudos/novo', component: LaudoPericialComponent },
  { path: 'laudos/:id/edit', component: LaudoPericialComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class LaudoPericialRoutingModule { }

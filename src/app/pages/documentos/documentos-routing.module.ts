import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosListComponent } from './documentos-list/documentos-list.component';
import { DocumentosFormComponent } from './documentos-form/documentos-form.component';

const routes: Routes = [
  { path: 'documentos', component: DocumentosListComponent },
  { path: 'documentos/novo', component: DocumentosFormComponent },
  { path: 'edit/:id', component: DocumentosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentosRoutingModule { }

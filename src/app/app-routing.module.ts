import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //TODO: implementar:
  /*
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    */
 { path: '**', redirectTo: 'pagina-nao-encontrada' },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

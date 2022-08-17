import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageUsuarioComponent } from '../usuario/page-usuario/page-usuario.component';
import { CompromissosComponent } from './compromissos/compromissos.component';



const routes: Routes = [
  {path: '', component: CompromissosComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }

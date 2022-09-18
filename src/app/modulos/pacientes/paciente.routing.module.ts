import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PagePacientesComponent } from "./page-pacientes/page-pacientes.component";

const routes: Routes = [
  {path: '', component: PagePacientesComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }

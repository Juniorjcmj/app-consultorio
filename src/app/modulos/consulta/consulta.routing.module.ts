import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaPageComponent } from './consulta-page/consulta-page.component';


const routes: Routes = [
  {path: '', component: ConsultaPageComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }

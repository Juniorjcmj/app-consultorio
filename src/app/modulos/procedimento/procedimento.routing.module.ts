import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedimentoPageComponent } from './procedimento-page/procedimento-page.component';


const routes: Routes = [
  {path: '', component: ProcedimentoPageComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedimentoRoutingModule { }

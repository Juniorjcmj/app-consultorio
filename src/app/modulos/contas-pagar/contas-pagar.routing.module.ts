import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageContasPagarComponent } from './page-contas-pagar/page-contas-pagar.component';


const routes: Routes = [
  {path: '', component: PageContasPagarComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasPagarRoutingModule { }

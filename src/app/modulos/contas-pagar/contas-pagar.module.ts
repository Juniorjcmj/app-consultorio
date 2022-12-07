import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasPagarRoutingModule } from './contas-pagar.routing.module';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { PageContasPagarComponent } from './page-contas-pagar/page-contas-pagar.component';



@NgModule({
  declarations: [
    PageContasPagarComponent

  ],
  imports: [
    CommonModule,
    ContasPagarRoutingModule,
    PrimengModule
  ]
})
export class ContasPagarModule { }

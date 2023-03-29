import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasPagarRoutingModule } from './contas-pagar.routing.module';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { PageContasPagarComponent } from './page-contas-pagar/page-contas-pagar.component';
import { FiltroAvancadoComponent } from './filtro-avancado/filtro-avancado.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { ChartModule } from 'primeng/chart';




@NgModule({
  declarations: [
    PageContasPagarComponent,
    FiltroAvancadoComponent,
    FinanceiroComponent
  ],
  imports: [
    CommonModule,
    ContasPagarRoutingModule,
    PrimengModule,
    ChartModule
  ]
})
export class ContasPagarModule { }

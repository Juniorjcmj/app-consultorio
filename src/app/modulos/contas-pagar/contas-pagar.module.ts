import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasPagarRoutingModule } from './contas-pagar.routing.module';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { PageContasPagarComponent } from './page-contas-pagar/page-contas-pagar.component';
import { FiltroAvancadoComponent } from './filtro-avancado/filtro-avancado.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { ChartModule } from 'primeng/chart';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';




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
    ChartModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#ffffff",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),
  ]
})
export class ContasPagarModule { }

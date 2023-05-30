import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './page/list.component';
import { ConciliacaoCartaoRoutingModule } from './conciliacao-cartao-routing.module';
import { PrimengModule } from '../../shared/primeng.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ConciliacaoCartaoRoutingModule,
    PrimengModule,
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
export class ConciliacaoCartaoModule { }

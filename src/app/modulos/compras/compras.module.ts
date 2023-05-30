import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComprasComponent } from './page-compras/page-compras.component';
import { PrimengModule } from '../../shared/primeng.module';
import { ComprasRelatorioComponent } from './compras-relatorio/compras-relatorio.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';



@NgModule({
  declarations: [
    PageComprasComponent,
    ComprasRelatorioComponent
  ],
  imports: [
    CommonModule,
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
export class ComprasModule { }

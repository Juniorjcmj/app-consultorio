import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComprasComponent } from './page-compras/page-compras.component';
import { PrimengModule } from '../../shared/primeng.module';
import { ComprasRelatorioComponent } from './compras-relatorio/compras-relatorio.component';



@NgModule({
  declarations: [
    PageComprasComponent,
    ComprasRelatorioComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ComprasModule { }

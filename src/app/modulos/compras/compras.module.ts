import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComprasComponent } from './page-compras/page-compras.component';
import { PrimengModule } from '../../shared/primeng.module';



@NgModule({
  declarations: [
    PageComprasComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ComprasModule { }

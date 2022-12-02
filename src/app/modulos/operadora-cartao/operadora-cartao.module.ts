import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOperadoraComponent } from './page-operadora/page-operadora.component';
import { PrimengModule } from 'src/app/shared/primeng.module';



@NgModule({
  declarations: [
    PageOperadoraComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class OperadoraCartaoModule { }

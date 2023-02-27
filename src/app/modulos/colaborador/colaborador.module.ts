import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageColaboradorComponent } from './page-colaborador/page-colaborador.component';
import { PrimengModule } from '../../shared/primeng.module';



@NgModule({
  declarations: [
    PageColaboradorComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ColaboradorModule { }

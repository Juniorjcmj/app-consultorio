import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageColaboradorComponent } from './page-colaborador/page-colaborador.component';
import { PrimengModule } from '../../shared/primeng.module';
import { PageFuncaoComponent } from './page-funcao/page-funcao.component';



@NgModule({
  declarations: [
    PageColaboradorComponent,
    PageFuncaoComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ColaboradorModule { }

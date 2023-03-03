import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { PageEntregaComponent } from './page-entrega/page-entrega.component';



@NgModule({
  declarations: [
    PageEntregaComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class EntregaModule { }

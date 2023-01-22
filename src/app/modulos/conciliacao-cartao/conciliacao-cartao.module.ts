import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './page/list.component';
import { ConciliacaoCartaoRoutingModule } from './conciliacao-cartao-routing.module';
import { PrimengModule } from '../../shared/primeng.module';



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ConciliacaoCartaoRoutingModule,
    PrimengModule
  ]
})
export class ConciliacaoCartaoModule { }

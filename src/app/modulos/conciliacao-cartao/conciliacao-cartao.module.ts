import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { PageComponent } from './page/page.component';
import { ConciliacaoCartaoRoutingModule } from './conciliacao-cartao-routing.module';
import { PrimengModule } from '../../shared/primeng.module';



@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    ConciliacaoCartaoRoutingModule,
    PrimengModule
  ]
})
export class ConciliacaoCartaoModule { }

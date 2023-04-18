import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBancoComponent } from './page-banco/page-banco.component';
import { PrimengModule } from 'src/app/shared/primeng.module';



@NgModule({
  declarations: [
    PageBancoComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class BancoModule { }

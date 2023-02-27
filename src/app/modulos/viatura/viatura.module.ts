import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageViaturaComponent } from './page-viatura/page-viatura.component';
import { PrimengModule } from 'src/app/shared/primeng.module';



@NgModule({
  declarations: [PageViaturaComponent],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ViaturaModule { }

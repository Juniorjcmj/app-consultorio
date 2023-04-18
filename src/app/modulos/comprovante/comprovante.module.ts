import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComprovanteComponent } from './page-comprovante/page-comprovante.component';
import { PrimengModule } from 'src/app/shared/primeng.module';



@NgModule({
  declarations: [
    PageComprovanteComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ComprovanteModule { }

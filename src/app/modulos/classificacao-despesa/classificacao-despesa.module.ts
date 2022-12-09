import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageClassificacaoDespesaComponent } from './page-classificacao-despesa/page-classificacao-despesa.component';
import { PrimengModule } from 'src/app/shared/primeng.module';




@NgModule({
  declarations: [
    PageClassificacaoDespesaComponent,

  ],
  imports: [
    CommonModule,
    PrimengModule,
  ]
})
export class ClassificacaoDespesaModule { }

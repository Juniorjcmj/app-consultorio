import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [ProductCardComponent, ProductListComponent],
  imports: [
    CommonModule,
    PrimengModule
  ]
})
export class ProdutosModule { }

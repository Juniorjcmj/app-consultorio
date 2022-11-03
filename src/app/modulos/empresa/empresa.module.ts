import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from './service/empresa-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[],
  providers:[
    EmpresaService
  ]
})
export class EmpresaModule { }

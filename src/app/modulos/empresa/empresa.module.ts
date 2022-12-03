import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from './service/empresa-service';
import { PageEmpresaComponent } from './page-empresa/page-empresa.component';
import { PrimengModule } from 'src/app/shared/primeng.module';



@NgModule({
  declarations: [
    PageEmpresaComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports:[],
  providers:[
    EmpresaService
  ]
})
export class EmpresaModule { }

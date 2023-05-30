import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from './service/empresa-service';
import { PageEmpresaComponent } from './page-empresa/page-empresa.component';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';



@NgModule({
  declarations: [
    PageEmpresaComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#ffffff",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),
  ],
  exports:[],
  providers:[
    EmpresaService
  ]
})
export class EmpresaModule { }

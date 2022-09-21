import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/shared/material.module';
import { ConsultaPageComponent } from './consulta-page/consulta-page.component';
import { ConsultaDetailComponent } from './consulta-detail/consulta-detail.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultaListComponent } from './consulta-list/consulta-list.component';



@NgModule({
  declarations: [ConsultaPageComponent,ConsultaDetailComponent, ConsultaFormComponent, ConsultaListComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule
  ]
})
export class ConsultaModule { }

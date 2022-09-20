import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedimentoFormComponent } from './procedimento-form/procedimento-form.component';
import { ProcedimentoListComponent } from './procedimento-list/procedimento-list.component';
import { ProcedimentoPageComponent } from './procedimento-page/procedimento-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProcedimentoRoutingModule } from './procedimento.routing.module';



@NgModule({
  declarations: [
    ProcedimentoFormComponent,
    ProcedimentoListComponent,
    ProcedimentoPageComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    ProcedimentoRoutingModule
  ]
})
export class ProcedimentoModule { }

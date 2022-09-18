import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/shared/material.module';
import { PacienteRoutingModule } from './paciente.routing.module';
import { PagePacientesComponent } from './page-pacientes/page-pacientes.component';





@NgModule({
  declarations: [PagePacientesComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    PacienteRoutingModule

  ]
})
export class PacientesModule { }

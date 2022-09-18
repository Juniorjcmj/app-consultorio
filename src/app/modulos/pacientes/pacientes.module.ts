import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/shared/material.module';
import { PacienteRoutingModule } from './paciente.routing.module';
import { PagePacientesComponent } from './page-pacientes/page-pacientes.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteDetalheComponent } from './paciente-detalhe/paciente-detalhe.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';

@NgModule({
  declarations: [PagePacientesComponent, PacienteFormComponent, PacienteDetalheComponent, PacienteListComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    PacienteRoutingModule

  ]
})
export class PacientesModule { }

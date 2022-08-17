import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda.routing.module';
import { CompromissosComponent } from './compromissos/compromissos.component';



@NgModule({
  declarations: [CompromissosComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule
  ]
})
export class AgendaModule { }

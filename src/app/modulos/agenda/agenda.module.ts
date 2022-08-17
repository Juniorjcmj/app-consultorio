import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgendaRoutingModule } from './agenda.routing.module';
import { CompromissosComponent } from './compromissos/compromissos.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserModule } from '@angular/platform-browser';
import { DemoUtilsModule } from './compromissos/util/module';

@NgModule({
  declarations: [CompromissosComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DemoUtilsModule
  ],
  exports: [

  ]
})
export class AgendaModule { }

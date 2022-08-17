import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { GrupoPermissaoFormComponent } from '../../usuario/grupo-permissao-form/grupo-permissao-form.component';
import { colors } from './util/colors';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-compromissos',
  templateUrl: './compromissos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompromissosComponent implements OnInit {

  view: CalendarView = CalendarView.Week;


  viewDate: Date = new Date();


  events: CalendarEvent[] = [
    {
      title: 'Juliana Tavares',
      color: colors.yellow,
      start: new Date(),
      draggable: true,

    },
    {
      title: 'José carlos',
      color: colors.blue,
      start: new Date(),
      draggable: true,

    },
    {
      title: 'Selma Belfort',
      color: colors.red,
      start: new Date(),
      draggable: true,
    },

  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event.title);
    const dialogRef = this.dialog.open(GrupoPermissaoFormComponent, {
      data: {

      },
    });
  }
  //CRIANDO EVENTO DE ARRASTAR E SOLTAR
  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    console.log(event)
    this.refresh.next();
  }
}

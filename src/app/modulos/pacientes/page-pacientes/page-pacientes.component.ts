import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UsuarioFormComponent } from '../../usuario/usuario-form/usuario-form.component';

@Component({
  selector: 'app-page-pacientes',
  templateUrl: './page-pacientes.component.html',
  styleUrls: ['./page-pacientes.component.scss']
})
export class PagePacientesComponent implements OnInit {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [

          { title: 'list', cols: 1, rows: 1 },

        ];
      }

      return [

        { title: 'list', cols: 2, rows: 5 },


      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  openDialogNovo() {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      data: {

      },
    });
  }

}

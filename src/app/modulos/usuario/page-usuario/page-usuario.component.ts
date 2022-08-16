import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { GrupoFormComponent } from '../grupo-form/grupo-form.component';
import { GrupoListComponent } from '../grupo-list/grupo-list.component';
import { PermissaoFormComponent } from '../permissao-form/permissao-form.component';
import { PermissaoListComponent } from '../permissao-list/permissao-list.component';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-page-usuario',
  templateUrl: './page-usuario.component.html',
  styleUrls: ['./page-usuario.component.scss']
})
export class PageUsuarioComponent implements OnInit {

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
  openDialogNewGrupo() {
    const dialogRef = this.dialog.open(GrupoFormComponent, {
      data: {

      },
    });
  }
  openDialogListGrupos() {
    const dialogRef = this.dialog.open(GrupoListComponent, {
      data: {

      },
    });
  }
  openDialogNewPermissao() {
    const dialogRef = this.dialog.open(PermissaoFormComponent, {
      data: {

      },
    });
  }
  openDialogListPermissoes() {
    const dialogRef = this.dialog.open(PermissaoListComponent, {
      data: {

      },
    });
  }
  // openFormPermissaoParaGrupo() {
  //   const dialogRef = this.dialog.open(GrupoPermissaoFormComponent, {
  //     data: {

  //     },
  //   });
  // }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import Swal from 'sweetalert2';
import { Grupo } from '../model/grupo';
import { PermissaoListComponent } from '../permissao-list/permissao-list.component';
import { GrupoPermissaoService } from '../service.grupo-permissao.service';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {

  grupos$: Observable<Grupo[]>;
  displayedColumns: string[] = ['ID','NOME', 'star'];
  constructor(private service: GrupoPermissaoService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private mensagem: MensagensService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsuarioListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {grupoModel: Grupo}) {

      this.grupos$ = this.service.list()
    .pipe(
      catchError(erros => {
            return of([])
      })
    );
     }

  ngOnInit(): void {
  }
  onDelete(record: string){
    Swal.fire({
      title: 'Confirmar a operação',
      text: "Operação não podera ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.onDelete(record).subscribe(
          success =>{
               this.mensagem.mensagemSucces("Grupo removido com sucesso!")
               setInterval(this.onReload, 2000)
          },
          error => {
            this.mensagem.mensagemError('Erro ao remover GRUPO. Tente novamente mais tarde.');
          }
         )
      }
    })
   }
   onReload(){
    window.location.reload();
   }
   openDialogListPermissoes(grupoModel: Grupo) {
    const dialogRef = this.dialog.open(PermissaoListComponent, {
      data: {
        grupoModel: grupoModel
      },
    });
  }

}

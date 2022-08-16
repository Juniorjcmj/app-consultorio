import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import Swal from 'sweetalert2';
import { Grupo } from '../model/grupo';
import { Permissao } from '../model/permissao';
import { GrupoPermissaoService } from '../service.grupo-permissao.service';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';

@Component({
  selector: 'app-permissao-list',
  templateUrl: './permissao-list.component.html',
  styleUrls: ['./permissao-list.component.scss']
})
export class PermissaoListComponent implements OnInit {
  permissoes$: Observable<Permissao[]>;
  displayedColumnsPermissao: string[] = ['ID', 'NOME', 'DESCRICAO', 'star'];

  grupoId: any;
  constructor( private service: GrupoPermissaoService,
                private formBuilder: FormBuilder,
                private snackBar: MatSnackBar,
                private mensagem: MensagensService,
                public dialogRef: MatDialogRef<UsuarioListComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {grupoModel: Grupo}) {

                  if(data.grupoModel == null || data.grupoModel == undefined){
                    this.permissoes$ = this.service.onListPermissoes().pipe(
                      catchError((erros) => {
                        return of([]);
                      })
                    );
                  }else{
                    this.grupoId = data.grupoModel.id;
                    this.permissoes$ = this.service.listpermissoesBygrupo(data.grupoModel.id).pipe(
                      catchError((erros) => {
                        return of([]);
                      })
                    );
                  }
                 }

  ngOnInit(): void {
  }

  onDeletePermissao(record: string){
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

        this.service.onDeletePermissao(record).subscribe(
          success =>{
               this.mensagem.mensagemSucces("Permissão removida com sucesso!")
               setInterval(this.onReload, 2000)
          },
          error => {
            this.mensagem.mensagemError('Erro ao remover Permissão. Tente novamente mais tarde.');
          }
         )
      }
    })
   }
   onReload(){
    window.location.reload();
   }
   onDesassociar(permissaoId: any){

    Swal.fire({
      title: 'Confirmar a operação',
      text: "Operação não podera ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Desassociar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.desassociarPermissaoGrupo(this.grupoId, permissaoId).subscribe(
          success =>{
            this.mensagem.mensagemSucces("Permissão removida com sucesso!")
            setInterval(this.onReload, 2000)
       },
       error => {
         this.mensagem.mensagemError('Erro ao desassociar Permissão do grupo. Tente novamente mais tarde.');
       }
        )

      }
    })

   }

}

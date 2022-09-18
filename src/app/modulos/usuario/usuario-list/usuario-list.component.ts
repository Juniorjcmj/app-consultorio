import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of, tap } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../model/usuario';
import { UserFormGroupComponent } from '../user-form-group/user-form-group.component';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios$: Observable<UsuarioModel[]>;

  displayedColumns: string[] = ['ID','NOME', 'LOGIN', 'E-MAIL', 'CPF', 'IDENTIDADE', 'IDADE','CARGO','WHATSAPP', 'star'];
  constructor(private service: UsuarioService,
    public dialog: MatDialog,
    private router: Router,
    private mensagem: MensagensService,
    private spinner: NgxSpinnerService) {
      this.spinner.show();
      this.usuarios$ = this.service.list()
      .pipe(
        tap(s => {
          this.spinner.hide();
          console.log(s)
        }),

        catchError(erros => {

              return of([])
        })
      )
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
               this.mensagem.mensagemSucces("Usuário removido com sucesso!")
               setInterval(this.onReload, 2000)
          },
          error => {
            this.mensagem.mensagemError('Erro ao remover USUÁRIO. Tente novamente mais tarde.');
          }
         )
      }
    })
   }

   onReload(){
    window.location.reload();
   }

   onDetail(id: string){


  }
  openDialogEdit(user:UsuarioModel ) {
    const dialogRef =   this.dialog.open(UsuarioFormComponent, {
      data: {
        user: user
      },
    });
  }
  openDialogPermissao(user:UsuarioModel ) {
    const dialogRef =   this.dialog.open(UserFormGroupComponent, {
      data: {
        user: user
      },
    });
  }
  whatsApp(record: UsuarioModel): void {
    const text =`Olá ${record.nome} tudo bem? está na hora de fazer uma revisão, estamos lhe aguardando no nosso consultório, abraços!`
    window.open(
      `https://wa.me/${record.telefone}?text=${text}`,
      '_blank'
    );
  }
}

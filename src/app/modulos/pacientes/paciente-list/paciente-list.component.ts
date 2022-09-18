import { PacienteFormComponent } from './../paciente-form/paciente-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of, tap } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../usuario/model/usuario';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent implements OnInit {

  pacientes$: Observable<UsuarioModel[]>;
  displayedColumns: string[] = ['ID','NOME', 'LOGIN', 'E-MAIL', 'CPF', 'IDENTIDADE', 'IDADE','WHATSAPP', 'star'];
  constructor(private service: UsuarioService,
    public dialog: MatDialog,
    private router: Router,
    private mensagem: MensagensService,
    private spinner: NgxSpinnerService) {

      this.spinner.show();

      this.pacientes$ = this.service.obterPacientes()
      .pipe(
        tap(s => {
          this.spinner.hide();
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
               this.mensagem.mensagemSucces("Pacientes removido com sucesso!")
               setInterval(this.onReload, 2000)
          },
          error => {
            this.mensagem.mensagemError('Erro ao remover Paciente. Tente novamente mais tarde.');
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
    const dialogRef =   this.dialog.open(PacienteFormComponent, {
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

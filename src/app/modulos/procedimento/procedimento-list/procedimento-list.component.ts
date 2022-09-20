import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of, tap } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import Swal from 'sweetalert2';
import { Procedimento } from '../procedimento-model';
import { ProcedimentoService } from '../procedimento.service';
import { ProcedimentoFormComponent } from '../procedimento-form/procedimento-form.component';

@Component({
  selector: 'app-procedimento-list',
  templateUrl: './procedimento-list.component.html',
  styleUrls: ['./procedimento-list.component.scss']
})
export class ProcedimentoListComponent implements OnInit {

  procedimento$: Observable<Procedimento[]>;
  displayedColumns: string[] = ['ID','VALOR', 'DESCRICAO', 'star'];
  constructor(private service: ProcedimentoService,
    public dialog: MatDialog,
    private router: Router,
    private mensagem: MensagensService,
    private spinner: NgxSpinnerService) {

      this.spinner.show();

      this.procedimento$ = this.service.list()
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
  openDialogEdit(procedimento:Procedimento ) {
    const dialogRef =   this.dialog.open(ProcedimentoFormComponent, {
      data: {
        procedimento: procedimento
      },
    });
  }


}

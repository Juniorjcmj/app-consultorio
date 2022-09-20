import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UsuarioModel } from '../../usuario/model/usuario';
import { UsuarioListComponent } from '../../usuario/usuario-list/usuario-list.component';

import { ProcedimentoService } from '../procedimento.service';
import { Procedimento } from '../procedimento-model';

@Component({
  selector: 'app-procedimento-form',
  templateUrl: './procedimento-form.component.html',
  styleUrls: ['./procedimento-form.component.scss']
})
export class ProcedimentoFormComponent implements OnInit {

  form: FormGroup;

  constructor(private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private mensagem: MensagensService,
    private service: ProcedimentoService,
    public dialogRef: MatDialogRef<UsuarioListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {procedimento: Procedimento},) {

      if(data.procedimento == undefined){
        this.form = this.formBuilder.group({
          id:[null],
          valor:[null, Validators.required],
          descricao:[null, Validators.required],
       })
      }else{
        this.form = this.formBuilder.group({
          id:[data.procedimento.id],
          valor:[data.procedimento.valor, Validators.required],
          descricao:[data.procedimento.descricao, Validators.required],

        })
      }
     }

  ngOnInit(): void {
  }

  onSubmit(){
    this.spinner.show();
    this.service.cadastro(this.form.value).subscribe(
        success =>{
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);

            this.form.reset();
            this.mensagem.mensagemSucces("Procedimento realizado com sucesso!")
            this.onReload();
        },
        error => {
          this.mensagem.mensagemError("Erro ao cadastrar, verifique os dados novamente")
        });

    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action);
    }
    onReload(){

      window.location.reload();
     }
   onResetForm(){
    this.dialogRef.close();
    return this.form.reset();
   }

}

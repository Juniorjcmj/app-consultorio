import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Grupo } from '../model/grupo';
import { UsuarioModel } from '../model/usuario';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  form: FormGroup;
  grupos: Grupo[]= [];

  constructor(private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private mensagem: MensagensService,
              private service: UsuarioService,
              public dialogRef: MatDialogRef<UsuarioListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {user: UsuarioModel},) {

                 if(data.user == undefined){
                  this.form = this.formBuilder.group({
                    id:[null],
                    nome:[null, Validators.required],
                    login:[null, Validators.required],
                    senha:[null, Validators.required],
                    cpf: [null,Validators.required],
                    identidade:[null,Validators.required],
                    idade:[null, Validators.required],
                    cargo:[null, Validators.required],
                    email:[null, Validators.required],
                    telefone:[null, Validators.required]
                 })
                }else{
                  this.form = this.formBuilder.group({
                    id:[data.user.id],
                    nome:[data.user.nome, Validators.required],
                    login:[data.user.login, Validators.required],
                    senha:[null, Validators.required],
                    cpf: [data.user.cpf,Validators.required],
                    identidade:[data.user.identidade,Validators.required],
                    idade:[data.user.idade, Validators.required],
                    cargo:[data.user.cargo, Validators.required],
                    email:[data.user.email, Validators.required],
                    telefone:[data.user.telefone, Validators.required],

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
            this.mensagem.mensagemSucces("Cadastro realizado com sucesso!")
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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Grupo } from '../model/grupo';
import { GrupoPermissaoService } from '../service.grupo-permissao.service';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent implements OnInit {

  form: FormGroup;
  constructor(private service:GrupoPermissaoService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private mensagem: MensagensService,
              public dialogRef: MatDialogRef<UsuarioListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {grupoModel: Grupo}) {

                this.form = this.formBuilder.group({
                  id:[null],
                  nome:[null, Validators.required],
                })
               }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.cadastro(this.form.value).subscribe(
        success =>{
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
    return this.form.reset();
   }

}

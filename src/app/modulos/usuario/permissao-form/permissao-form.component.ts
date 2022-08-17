import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Permissao } from '../model/permissao';
import { GrupoPermissaoService } from '../service.grupo-permissao.service';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';

@Component({
  selector: 'app-permissao-form',
  templateUrl: './permissao-form.component.html',
  styleUrls: ['./permissao-form.component.scss']
})
export class PermissaoFormComponent implements OnInit {
  formPermissao: FormGroup;
  constructor(private service: GrupoPermissaoService,
              private formBuilder: UntypedFormBuilder,
              private snackBar: MatSnackBar,
              private mensagem: MensagensService,
              public dialogRef: MatDialogRef<UsuarioListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {permissaoModel: Permissao}) {

                this.formPermissao = this.formBuilder.group({
                  id:[null],
                  nome:[null, Validators.required],
                  descricao:[null, Validators.required],
                })
               }

  ngOnInit(): void {
  }

  onSubmitPermissoes(){
    this.service.onCadastroOuUpdatePermissao(this.formPermissao.value).subscribe(
      success =>{
          this.formPermissao.reset();
          this.mensagem.mensagemSucces("Cadastro realizado com sucesso!")
          this.onReload();
      },
      error => {
        this.mensagem.mensagemError("Erro ao cadastrar, verifique os dados novamente")
      });
   }
   onResetFormPermissao(){
    this.dialogRef.close();
    return this.formPermissao.reset();
   }
   onReload(){
    window.location.reload();
   }

}

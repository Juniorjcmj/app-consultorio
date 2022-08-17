import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Grupo } from '../model/grupo';
import { UsuarioModel } from '../model/usuario';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-user-form-group',
  templateUrl: './user-form-group.component.html',
  styleUrls: ['./user-form-group.component.scss']
})
export class UserFormGroupComponent implements OnInit {

  form: FormGroup;
  grupos: Grupo[]= [];
  usuarioGrupos$:Observable<Grupo[]>;

  usuarioId = "";
    constructor(private formBuilder: FormBuilder,
                private snackBar: MatSnackBar,
                private mensagem: MensagensService,
                private service: UsuarioService,
                public dialogRef: MatDialogRef<UsuarioListComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {user: UsuarioModel},) { this.usuarioId = data.user.id;

                  this.form = this.formBuilder.group({
                    usuarioId:[data.user.id],
                    grupoId:[null]
                  })
            //pega os grupos para adicionar ao usuario
                  this.service.onGrupos().subscribe(
                    data => {
                      this.grupos = data;
                    }
                  )

                  //busca todos os grupos do usuario
                this.usuarioGrupos$ = this.service.getGruposByUser(this.usuarioId)
                .pipe(
                  catchError(erros => {
                    this.onError(erros)

                        return of([])
                  })
                )

                 }
              onError(erros: any) {
                throw new Error('Method not implemented.');
              }

              ngOnInit(): void {
              }

              onSubmit(){
                console.log(this.form.value)
                this.service.saveGrupo(this.form.value).subscribe(
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
                this.dialogRef.close();
                return this.form.reset();
               }
               onDelete(grupoId: any){

                this.service.removeGrupo(this.usuarioId,grupoId ).subscribe(
                  success =>{
                      this.form.reset();
                      this.mensagem.mensagemSucces("Removido com sucesso!")
                      this.onReload();
                  },
                  error => {
                    this.mensagem.mensagemError("Erro ao remover")
                  });
               }

            }

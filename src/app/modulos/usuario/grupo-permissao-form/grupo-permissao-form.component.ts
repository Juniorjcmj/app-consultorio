import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Grupo } from '../model/grupo';
import { Permissao } from '../model/permissao';
import { GrupoPermissaoService } from '../service.grupo-permissao.service';

@Component({
  selector: 'app-grupo-permissao-form',
  templateUrl: './grupo-permissao-form.component.html',
  styleUrls: ['./grupo-permissao-form.component.scss']
})
export class GrupoPermissaoFormComponent implements OnInit {

  form: FormGroup;

  grupos: Grupo[]= [];
  permissoes: Permissao[]= [];
  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private mensagem: MensagensService,
              private service: GrupoPermissaoService) {

              this.service.list().subscribe(
                data=> {
                  this.grupos = data;
                }
              )
              this.service.onListPermissoes().subscribe(
                data => {
                  this.permissoes = data;
                }
              )
                this.form = this.formBuilder.group({
                  permissaoId:[null,Validators.required],
                  grupoId:[null, Validators.required],

                })
               }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.associarPermissaoGrupo(this.form.value).subscribe(
        success =>{
            this.form.reset();
            this.mensagem.mensagemSucces("Permissão associada ao grupo com sucesso!")
            this.onReload();
        },
        error => {
          this.mensagem.mensagemError("Erro ao associar, verifique os dados novamente")
        });

    }
    onReload(){
      window.location.reload();
     }
   onResetForm(){
    return this.form.reset();
   }

}

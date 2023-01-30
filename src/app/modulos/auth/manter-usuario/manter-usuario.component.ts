import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { UsuarioServiceService } from '../usuario-service.service';
import { Observable, map, catchError, tap, of } from 'rxjs';
import { UsuarioModel } from '../model/usuarioModel';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { PermissaoModel } from '../model/permissaoModel';
import { GrupoModel } from '../model/grupoModel';

@Component({
  selector: 'app-manter-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrls: ['./manter-usuario.component.scss'],
  providers: [MessageService, ConfirmationService, CustomMensagensService],
})
export class ManterUsuarioComponent implements OnInit {


 pagina!: UsuarioModel[];

 form!: FormGroup;
 submitted!: boolean;
 usuarioFormDialog!: boolean;

 formSenha!: FormGroup;
 senhaDialog!:boolean;

 permissoes!: PermissaoModel[];
 grupos!: GrupoModel[];

  constructor(private service: UsuarioServiceService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private message: CustomMensagensService) {

      this.service.getAll().subscribe(
        (data: any) => {
          this.pagina = data;
        },
        (error: any) => {
          this.authService.getRedirect401(error.status);
        }
      );
      this.service.getAllPermissoes().subscribe(
        (data: any) => {
          this.permissoes = data;
        },
        (error: any) => {
          this.authService.getRedirect401(error.status);
        }
      );
      this.service.getAllGrupo().subscribe(
        (data: any) => {
          this.grupos = data;
        },
        (error: any) => {
          this.authService.getRedirect401(error.status);
        }
      );

      }
  ngOnInit(): void {
    this.spinner.show();
  }
  hideDialog() {
    this.usuarioFormDialog = false;
    this.submitted = false;
  }
  manterUsuario(){
    this.spinner.show();
    this.service.manter(this.form.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.message.onMessage("Operação realizada com Sucesso", "info")
        this.pagina = data;
      },
      (error: any) => {
        this.spinner.hide();
        this.message.onMessage("Ocorreu um erro!", "error")
      }
    );
  }
  openNew() {
    this.form = this.formBuilder.group({
      id:[],
      nome: [null, Validators.required],
      login: [null, Validators.required],
      senha: [null, Validators.required],
      cpf: [null, Validators.required],
      cargo: [null, Validators.required],
      telefone: [null, Validators.required],
      idade: [null, Validators.required],
      identidade: [null, Validators.required],
    });
    this.submitted = false;
    this.usuarioFormDialog = true;
  }

  edit(usuario: UsuarioModel){

    this.form = this.formBuilder.group({
      id:[usuario.id],
      nome: [usuario.nome, Validators.required],
      login: [usuario.login, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      cargo: [usuario.cargo, Validators.required],
      teleforne: [usuario.telefone, Validators.required],
      idade: [usuario.idade, Validators.required],
      identidade: [usuario.identidade, Validators.required],
    });
    this.submitted = false;
    this.usuarioFormDialog = true;
  }


  delete(usuario: UsuarioModel){
    console.log(usuario)
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + usuario.login + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.spinner.show();
        this.service.delete(usuario.id).subscribe(
          data => {
            this.spinner.hide();
            this.message.onSuccessSmall();
            this.pagina = data;

          },
          error =>{
            this.spinner.hide();
            this.message.onMessage("Error ao excluir usuário(a)", "error")
          }
        )
      },
    });


  }
  alterarSenha(usuario: UsuarioModel){
      this.formSenha = this.formBuilder.group({
        id:[usuario.id],
        senha: [null, Validators.required],
      });
      this.submitted = false;
      this.senhaDialog = true;
    }

  novaSenha(){
    this.spinner.show();
  this.senhaDialog = false;
    this.service.novaSenha(this.formSenha.value['id'], this.formSenha.value['senha']).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.message.onMessage("Senha alterada com Sucesso", "info")
        this.pagina = data;
      },
      (error: any) => {
        this.spinner.hide();
        this.message.onMessage("Ocorreu um erro!", "error")
      }
    );
  }



}

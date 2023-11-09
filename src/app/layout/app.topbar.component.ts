import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from '../modulos/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsuarioServiceService} from "../modulos/auth/usuario-service.service";
import {CustomMensagensService} from "../services/mensagens.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    nomeUsuario: any = ""
    formSenha!: FormGroup;
    senhaDialog!:boolean;


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                private service: UsuarioServiceService,
                private router: Router,
                private message: CustomMensagensService,
                private authService: AuthService,
                private formBuilder: FormBuilder,) {

      this.nomeUsuario = this.authService.getUser();
    }

    logout(){
      localStorage.clear();
      this.router.navigate(["/login"])

    }
  novaSenha(){

    this.senhaDialog = false;
    this.service.novaSenha(this.formSenha.value['id'], this.formSenha.value['senha']).subscribe(
      (data: any) => {

        this.message.onMessage("Senha alterada com Sucesso", "info")

      },
      (error: any) => {

        this.message.onMessage("Ocorreu um erro!", "error")
      }
    );
  }
}

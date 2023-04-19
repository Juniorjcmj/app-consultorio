import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { AuthService } from '../auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginComponent implements OnInit {

  credentials = {
    username: "",
    password:""
  }
  formLogin!: FormGroup;
  valCheck: string[] = ['remember'];

  mostrarLoginOuSenhaInvalidos = false ;
  constructor(
              public layoutService: LayoutService,
              private authServer : AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private message: CustomMensagensService) {

    this.formLogin = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

  }

  ngOnInit(): void {
  }

  onSubmit(){

        this.authServer.genereteToken(this.formLogin.value['username'], this.formLogin.value['password']).subscribe(
          (response:any) =>{
           localStorage.setItem('token', response.access_token);
           localStorage.setItem('expires_in', response.expires_in);
           localStorage.setItem('nome', response.nome_completo);
           localStorage.setItem('refresh_token', response.refresh_token);
           localStorage.setItem('token_type', response.token_type);

           this.router.navigate(['/home'])

          }, error =>{
            this.mostrarLoginOuSenhaInvalidos = true;
            this.message.onMessage("Login ou senha inválidos", "error")
          }
        )
      }
isLogado(){
  return !this.authServer.isLoggedIn();
}



}

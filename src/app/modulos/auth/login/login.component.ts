import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {
    username: "",
    password:""
  }
  formLogin!: FormGroup;

  mostrarLoginOuSenhaInvalidos = false ;
  constructor(private authServer : AuthService,  private router: Router,private formBuilder: FormBuilder,) {

    this.formLogin = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

  }

  ngOnInit(): void {
  }

  onSubmit(){
  console.log(this.formLogin.value['username'], this.formLogin.value['password'])
        this.authServer.genereteToken(this.formLogin.value['username'], this.formLogin.value['password']).subscribe(
          (response:any) =>{
           localStorage.setItem('token', response.access_token);
           localStorage.setItem('expires_in', response.expires_in);
           localStorage.setItem('nome', response.nome_completo);
           localStorage.setItem('refresh_token', response.refresh_token);
           localStorage.setItem('token_type', response.token_type);

           this.router.navigate(['/operadora-cartao'])

          }, error =>{
            this.mostrarLoginOuSenhaInvalidos = true;
            console.log(error);
          }
        )



}
isLogado(){
  return !this.authServer.isLoggedIn();
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginService } from './login.service';

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
  constructor(private loginService: LoginService,
              private router: Router,
              private userService: UsuarioService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    localStorage.clear();
    if((this.credentials.username != "" && this.credentials.password != "")&& (this.credentials.username != null && this.credentials.password != null))
    {
        this.loginService.genereteToken(this.credentials.username, this.credentials.password).subscribe(
          (response:any) =>{
                     //success

           localStorage.setItem('token', response.access_token);
           localStorage.setItem('expires_in', response.expires_in);
           localStorage.setItem('nome', response.nome_completo);
           localStorage.setItem('refresh_token', response.refresh_token);
           localStorage.setItem('token_type', response.token_type);

           if(this.loginService.getUser() != null || this.loginService.getUser() != undefined){
            localStorage.clear();
           }
           localStorage.setItem('usuarioId', response.usuario_id);
           this.userService.getGruposByUser(response.usuario_id).subscribe(
             data => {
                 let grupos = data;
                 let nomes = [];
                 for(let i =0; i < grupos.length; i++){
                    nomes[i] = grupos[i].nome;

                 }
                 localStorage.setItem('grupos', JSON.stringify(nomes))

             }
           )
          console.log(localStorage)
           this.router.navigate(['home'])

          }, error =>{
            //error
            console.log(error);
          }
        )

    }else{
      console.log("Campos estao vazios")
    }
  }

}

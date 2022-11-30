import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../usuario/model/authUser';

import { UsuarioService } from '../usuario/usuario.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authUser: AuthUser = {
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
    if((this.authUser.username != "" && this.authUser.password != "")&& (this.authUser.username != null && this.authUser.password != null))
    {
        this.loginService.genereteToken(this.authUser).subscribe(
          (response:any) =>{                    //success

           console.log(JSON.stringify(response));
           localStorage.setItem('token', response.access_token);
           localStorage.setItem('expires_in', response.expires_in);
           localStorage.setItem('nome', response.nome_completo);
           localStorage.setItem('refresh_token', response.refresh_token);
           localStorage.setItem('token_type', response.token_type);
           localStorage.setItem('jti', response.jti);


           if(this.loginService.getUser() != null || this.loginService.getUser() != undefined){
            localStorage.clear();
           }
           localStorage.setItem('usuarioId', response.usuario_id);
          //  this.userService.getGruposByUser(response.usuario_id).subscribe(
          //    data => {
          //        let grupos = data;
          //        let nomes = [];
          //        for(let i =0; i < grupos.length; i++){
          //           nomes[i] = grupos[i].nome;

          //        }
          //        localStorage.setItem('grupos', JSON.stringify(nomes))

          //    }
          //  )
           this.loginService.isLoggedIn();
           this.router.navigate(['home'])

          }, error =>{
            //error
            console.log(error);
          }
        )
        console.log(localStorage)

    }else{
      console.log("Campos estao vazios")
    }
  }

}

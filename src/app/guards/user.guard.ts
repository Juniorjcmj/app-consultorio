import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../modulos/login/login.service';
import { UsuarioService } from '../modulos/usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  constructor(private loginService: LoginService,private router: Router,private userService: UsuarioService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean > | boolean   {

    let user: any = this.loginService.decodeJwt();
    let authorities: string[]  = user['authorities']
    if(user['authorities'] != undefined){
      var userAdministrador = authorities.find(x => x ===  "ADMINISTRADOR")

      if(userAdministrador !== undefined){
        if(userAdministrador){
             return true;
        }

      }
    }

      return false;
  }
}

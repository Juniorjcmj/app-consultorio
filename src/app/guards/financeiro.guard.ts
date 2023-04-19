import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';

import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { AuthService } from '../modulos/auth/auth.service';
import { CustomMensagensService } from '../services/mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroGuard implements CanActivate {
  constructor(private loginService: AuthService,private router: Router, private message: CustomMensagensService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedIn()){

        for(let grupo of this.loginService.getPermissoes()){
          if(grupo == "ADMINISTRADOR"||grupo == "FINANCEIRO"||grupo == "AUXILIAR_FINANCEIRO"){
               return true;
              }
            }
        this.message.onMessage("Você não tem previlégio de acesso!", "error")
        return false;
      }
      this.router.navigate(['acesso-negado'])



      return false;
  }
}

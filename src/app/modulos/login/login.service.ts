import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrlResourceServe = environment.apiUrlResourceServer + 'token';

  verificarSeEstaLogado = new EventEmitter();

  constructor(private keycloakService: KeycloakService) {}

  // genereteToken(authUser: AuthUser) {
  //   let params = new URLSearchParams();
  //   params.append('grant_type', 'password');
  //    params.append('client_id', 'jcmj');
  //    params.append('client_secret', '@Clti!2019');
  //   params.append('username', authUser.username);
  //   params.append('password', authUser.password);

  //   let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});

  //   return this.httpClient.post(`${this.apiUrlResourceServe}`, params.toString(), {  headers: headers  });
  // }

  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }
  isLoggedIn() {
      this.verificarSeEstaLogado.emit(this.keycloakService.isLoggedIn);

  }
  logout() {
    this.verificarSeEstaLogado.emit(this.keycloakService.logout("http://localhost:4200/"));
    return true;
  }

  getToken(): any {
    return this.keycloakService.getToken();
  }
  getUser() {
    return this.keycloakService.getUsername();
  }
  getGrupos(): any {
    return this.keycloakService.getUserRoles();
  }
  getNome() {
    return this.keycloakService.getUsername();
  }



  isAdmin() {

    let authorities: string[] = this.keycloakService.getUserRoles();
    if (authorities != undefined) {
      var userAdministrador = authorities.find((x) => x === 'ADMINISTRADOR');
      if (userAdministrador !== undefined) {
        if (userAdministrador) {
          return true;
        }
      }
    }

    return false;
  }
}

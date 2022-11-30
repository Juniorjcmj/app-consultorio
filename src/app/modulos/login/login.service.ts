import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthUser } from '../usuario/model/authUser';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrlResourceServe = environment.apiUrlResourceServer + 'token';

  verificarSeEstaLogado = new EventEmitter();

  constructor(private httpClient: HttpClient, private router: Router) {}

  genereteToken(authUser: AuthUser) {
    let params = new URLSearchParams();
    params.append('grant_type', 'password');
     params.append('client_id', 'jcmj');
     params.append('client_secret', '@Clti!2019');
    params.append('username', authUser.username);
    params.append('password', authUser.password);

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});

    return this.httpClient.post(`${this.apiUrlResourceServe}`, params.toString(), {  headers: headers  });
  }

  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      this.verificarSeEstaLogado.emit(true);
      return true;
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.verificarSeEstaLogado.emit(false);
    return true;
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }
  getUser() {
    return localStorage.getItem('usuarioId');
  }
  getGrupos(): string {
    return localStorage.getItem('grupos')!;
  }
  getNome() {
    return localStorage.getItem('nome');
  }

  decodeJwt() {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }

  isAdmin() {
    let user: any = this.decodeJwt();
    let authorities: string[] = user['authorities'];
    if (user['authorities'] != undefined) {
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

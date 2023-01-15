import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrlAutenticator = environment.apiUrlAuthenticationServer + "oauth/token";

  constructor(private httpClient: HttpClient,
    private router: Router) { }


genereteToken(username: string, password:string){
  let params = new URLSearchParams();
      params.append('grant_type','password');
      params.append('client_id', "jcmj");
      params.append('client_secret', '@Clti!2019');
      params.append('username', username);
      params.append('password', password);


  let headers =
    new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

  return this.httpClient.post(`${this.apiUrlAutenticator}`,params.toString(),{ headers: headers })
}
loginUser(token: any){

  localStorage.setItem("token", token)
   return true;

 }
  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token== undefined || token ==="" || token == null){
      return false;
    }else{
      return true;
    }
  }
  logout(){
    localStorage.removeItem('token');
    return true;
  }

  getToken(){
    return  localStorage.getItem('token');
  }
  getUser(){
    return localStorage.getItem('nome')
  }

  getRedirect401(error :any){

    if(error.status === 401){
      localStorage.clear();
      this.router.navigate(["auth/login"])
    }

  }
}


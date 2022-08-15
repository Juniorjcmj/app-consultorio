import { Component } from '@angular/core';
import { LoginService } from './modulos/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
 sideBarOpen = true;
 logado: any;
 constructor(private service: LoginService){

  //this.logado = this.service.isLoggedIn();
  this.service.verificarSeEstaLogado.subscribe(
    data =>{
      this.logado = data;
    }
  )
 }

 sideBarToggler(){
   this.sideBarOpen = !this.sideBarOpen;
 }
 logout(evento: any){
  console.log(evento);
  this.logado = evento;
  window.location.reload()
 }
}

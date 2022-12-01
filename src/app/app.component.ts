import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
 sideBarOpen = true;
 logado: any;
 constructor(private keycloakService: KeycloakService){

  //this.logado = this.service.isLoggedIn();
  this.logado = this.keycloakService.isLoggedIn();
 }

 sideBarToggler(){
   this.sideBarOpen = !this.sideBarOpen;
 }
 logout(evento: any){

  return this.keycloakService.logout("http://localhost:4200/");
 }
}

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit  {
 sideBarOpen = true;
 logado: any;
 constructor(private keycloakService: KeycloakService, private primengConfig: PrimeNGConfig){

  //this.logado = this.service.isLoggedIn();
  this.logado = this.keycloakService.isLoggedIn();
 }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

 sideBarToggler(){
   this.sideBarOpen = !this.sideBarOpen;
 }
 logout(evento: any){

  return this.keycloakService.logout("http://localhost:4200/");
 }
}

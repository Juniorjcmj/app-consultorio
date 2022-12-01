import { Component, OnInit } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  //isLogado: boolean;
  constructor(private keycloakServvice: KeycloakService,private router: Router) {

   }

  ngOnInit(): void {
  }
  // logout(){
  //   this.service.logout()
  //   this.router.navigate(['login'])
  //   }

  //   isPageUser(){
  //     this.router.navigate(['page-user'])
  //   }
  //   isHome(){
  //     this.router.navigate(['home'])
  //   }

}

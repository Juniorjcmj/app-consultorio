import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit  {
 sideBarOpen = true;
 logado: any;
 constructor( private primengConfig: PrimeNGConfig){

  //this.logado = this.service.isLoggedIn();

 }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

 sideBarToggler(){
   this.sideBarOpen = !this.sideBarOpen;
 }

}

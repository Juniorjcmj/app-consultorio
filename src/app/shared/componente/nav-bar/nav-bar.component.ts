import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modulos/login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogado: boolean;
  constructor(private service: LoginService,private router: Router) {
    this.isLogado = service.isLoggedIn();
   }

  ngOnInit(): void {
  }
  logout(){
    this.service.logout()
    this.router.navigate(['login'])
    }

    isPageUser(){
      this.router.navigate(['page-user'])
    }
    isHome(){
      this.router.navigate(['home'])
    }

}

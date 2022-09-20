import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modulos/login/login.service';

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private service: LoginService) {

    let user: any = this.service.decodeJwt();
    let authorities: string[]  = user['authorities']
    if(user['authorities'] != undefined){
      var userAdministrador = authorities.find(x => x ===  "ADMINISTRADOR")

      if(userAdministrador !== undefined){
        if(userAdministrador){
          this.isAdmin = true;
        }

      }
    }

   }

  ngOnInit(): void {
  }

}

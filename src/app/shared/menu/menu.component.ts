import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../../modulos/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  itemsOff: MenuItem[];

  nomeUsuario: any = ""

  constructor( private router: Router,private authService: AuthService) {

    this.nomeUsuario = this.authService.getUser();

    this.itemsOff = [
      {
        label:'Bem Vindo!',
    }
    ]

    this.items = [
      {
        label:'Home',
        icon:'pi pi-fw pi-home',
        routerLink: '/home',

    },
    {
      label:'Contas a Pagar',
      icon:'pi pi-fw pi-calculator',
      items:[
          {
          label:'Contas',
          icon:'pi pi-fw pi-credit-card',
          routerLink: '/contas-pagar',
          },
          {
            label:'Classificação',
            icon:'pi pi-fw pi-list',
            routerLink: '/classificacao',
            },
      ]


  },

        {

            label:'Conciliação',
            icon:'pi pi-fw pi-calculator',
            items:[
                {
                    label:'Cartão',
                    icon:'pi pi-fw pi-credit-card',
                    routerLink: '/cartao'
                },
                {
                    label:'Operadora',
                    icon:'pi pi-fw pi-thumbs-up-fill',
                    routerLink: '/operadora-cartao'
                },
                {
                  label:'Empresas',
                  icon:'pi pi-fw pi-building',
                  routerLink: '/empresa'
              },

            ]
        },
        {
          label:this.nomeUsuario
      },

    ];
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();

    this.router.navigate(["auth/login"])

  }
  usuarioLogado():boolean{
    return this.authService.isLoggedIn();
  }


}

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
        label:'INÍCIO',
        icon:'pi pi-fw pi-home',
        routerLink: '/home',

    },
    {
      label:'FINANCEIRO',
      icon:'pi pi-fw pi-calculator',
      items:[
          {
          label:'CONTAS',
          icon:'pi pi-fw pi-credit-card',
          routerLink: '/contas-pagar',
          },
          {
            label:'CLASSIFICAÇÃO',
            icon:'pi pi-fw pi-id-card',
            routerLink: '/classificacao',
            },
      ]


  },

        {

            label:'CONCILIAÇÃO',
            icon:'pi pi-fw pi-credit-card',
            items:[
                {
                    label:'CARTÃO',
                    icon:'pi pi-fw pi-credit-card',
                    routerLink: '/cartao'
                },
                {
                    label:'OPERADORA',
                    icon:'pi pi-fw pi-shopping-bag',
                    routerLink: '/operadora-cartao'
                },

            ]
        },
        {

          label:'CONFIGURAÇÃO',
          icon:'pi pi-fw pi-cog',
          items:[
              {
                  label:'USUÁRIOS',
                  icon:'pi pi-fw pi-users',
                  routerLink: '/usuarios'
              },
              {
                label:'EMPRESAS',
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

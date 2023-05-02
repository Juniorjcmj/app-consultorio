import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'PÁGINA INICIAL',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'FINANCEIRO',
                items: [


                          { label: 'Contas a Pagar', icon: 'pi pi-fw pi-money-bill', routerLink: ['/contas-pagar'] },
                          { label: 'Classificação', icon: 'pi pi-fw pi-check-square', routerLink: ['/classificacao'] },
                          { label: 'Comprovantes', icon: 'pi pi-fw pi-bookmark', routerLink: ['/comprovante'] },
                          { label: 'Bancos', icon: 'pi pi-fw pi-bookmark', routerLink: ['/banco'] },




                ]
            },
            {
                label: 'CONCILIAÇÃO',
                items: [

                       { label: 'Cartão', icon: 'pi pi-fw pi-id-card', routerLink: ['/cartao'], badge: 'NEW' },
                       { label: 'Operadoras', icon: 'pi pi-fw pi-calculator', routerLink: ['/operadora-cartao'],badge: 'NEW'},




                ]
            },
            {
                label: 'EXPEDIÇÃO',
                items: [
                    { label: 'Entregas', icon: 'pi pi-fw pi-prime', routerLink: ['/entregas'] },
                ]
            },

             {
              label: 'CONFIGURAÇÕES',
              items: [
                  {
                      label: 'Menu', icon: 'pi pi-fw pi-bookmark',
                      items: [
                          {
                              label: 'Usuários', icon: 'pi pi-fw pi-bookmark',routerLink: ['/usuarios']

                          },
                          {
                              label: 'Viatura', icon: 'pi pi-fw pi-bookmark',routerLink: ['/viaturas']

                          },
                          {
                            label: 'Empresas', icon: 'pi pi-fw pi-bookmark',routerLink: ['/empresa']

                        },
                        {
                          label: 'Colaboradores', icon: 'pi pi-fw pi-bookmark',routerLink: ['/colaborador']

                      },
                      {
                        label: 'Funções', icon: 'pi pi-fw pi-bookmark',routerLink: ['/funcao']

                    },
                      ]
                  },

              ]

          },
        ];
    }
}

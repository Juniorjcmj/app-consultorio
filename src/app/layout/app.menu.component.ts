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
                    { label: 'Contas a Pagar', icon: 'pi pi-fw pi-id-card', routerLink: ['/contas-pagar'] },
                    { label: 'Classificação', icon: 'pi pi-fw pi-check-square', routerLink: ['/classificacao'] },
                    { label: 'Comprovantes', icon: 'pi pi-fw pi-bookmark', routerLink: ['/comprovante'] },
                    { label: 'Bancos', icon: 'pi pi-fw pi-bookmark', routerLink: ['/banco'] },

                ]
            },
            {
                label: 'CONCILIAÇÃO',
                items: [
                    { label: 'Cartão', icon: 'pi pi-fw pi-eye', routerLink: ['/cartao'], badge: 'NEW' },
                    { label: 'Operadoras', icon: 'pi pi-fw pi-globe', routerLink: ['/operadora-cartao'],badge: 'NEW'},
                ]
            },
            {
                label: 'EXPEDIÇÃO',
                items: [
                    { label: 'Entregas', icon: 'pi pi-fw pi-prime', routerLink: ['/entregas'] },
                ]
            },
            {
                label: 'CONFIGURAÇÃO',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/']
                    },
                    {
                        label: 'Empresas',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/']
                    },
                    {
                        label: 'Colaboradores',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/']
                    },
                    {
                        label: 'Viaturas',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/']
                    },

                ]

            }
        ];
    }
}

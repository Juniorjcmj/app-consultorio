import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';



import { AppComponent } from './app.component';

import { HomeComponent } from './modulos/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

// **************Para formatar moeda para real brasileiro************************************
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MaterialModule } from './shared/material.module';


import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavBarComponent } from './shared/componente/nav-bar/nav-bar.component';
import { HeaderComponent } from './shared/componente/header/header.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';

import { PrimengModule } from './shared/primeng.module';
import { MenuComponent } from './shared/menu/menu.component';
import { ConciliacaoCartaoModule } from './modulos/conciliacao-cartao/conciliacao-cartao.module';
import { EmpresaModule } from './modulos/empresa/empresa.module';


import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { OperadoraCartaoModule } from './modulos/operadora-cartao/operadora-cartao.module';
import { ContasPagarModule } from './modulos/contas-pagar/contas-pagar.module';

import { DateFnsModule } from 'ngx-date-fns';
import { ClassificacaoDespesaModule } from './modulos/classificacao-despesa/classificacao-despesa.module';
import { AuthModule } from './modulos/auth/auth.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { NotfoundComponent } from './modulos/notfound/notfound.component';
import { FinanceiroGuard } from './guards/financeiro.guard';
import { AdminGuard } from './guards/admin.guard';
import { PageViaturaComponent } from './modulos/viatura/page-viatura/page-viatura.component';
import { ViaturaModule } from './modulos/viatura/viatura.module';
import { ColaboradorModule } from './modulos/colaborador/colaborador.module';
import { EntregaModule } from './modulos/entrega/entrega.module';
import { ProdutosModule } from './modulos/produtos/produtos.module';
import { ProductCardComponent } from './modulos/produtos/product-card/product-card.component';
import { ExpedicaoGuard } from './guards/expedicao.guard';






// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: {
//         url: 'http://localhost:8180/',
//         realm: 'auth-server',
//         clientId: 'api-gestao-client'
//       },
//       initOptions: {
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri:
//           window.location.origin + '/assets/silent-check-sso.html'
//       },
//       loadUserProfileAtStartUp:true
//     });
// }


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    DashboardComponent,
    //novo sistemaServico
    MenuComponent,
    NotfoundComponent
    ,



  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxSpinnerModule,
    FormsModule,
    PrimengModule,
    EmpresaModule,
    OperadoraCartaoModule,
    ContasPagarModule,
    ClassificacaoDespesaModule,
    ViaturaModule,
    ColaboradorModule,
    EntregaModule,
    AuthModule,
    ProdutosModule,
  //novo  sistema-servvico
  ConciliacaoCartaoModule,
  KeycloakAngularModule,



  ],
  providers: [

   {
     provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi:true
      },
      // **********Para formatar moeda para real brasileiro**************************
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    // *
    AuthGuard,
    FinanceiroGuard,
    AdminGuard,
    ExpedicaoGuard

  ],
  exports:[
    NotfoundComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

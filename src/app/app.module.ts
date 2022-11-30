import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';



import { AppComponent } from './app.component';

import { LoginComponent } from './modulos/login/login.component';
import { HomeComponent } from './modulos/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './modulos/login/login.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// **************Para formatar moeda para real brasileiro************************************
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MaterialModule } from './shared/material.module';
import { MensagensService } from './services/mensagens.service';

import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavBarComponent } from './shared/componente/nav-bar/nav-bar.component';
import { HeaderComponent } from './shared/componente/header/header.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';
import { SidnavComponent } from './shared/componente/sidnav/sidnav.component';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { PacientesModule } from './modulos/pacientes/pacientes.module';
import { ProcedimentoModule } from './modulos/procedimento/procedimento.module';
import { ConsultaModule } from './modulos/consulta/consulta.module';
import { PrimengModule } from './shared/primeng.module';
import { MenuComponent } from './shared/menu/menu.component';
import { ConciliacaoCartaoModule } from './modulos/conciliacao-cartao/conciliacao-cartao.module';
import { EmpresaModule } from './modulos/empresa/empresa.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/',
        realm: 'auth-server',
        clientId: 'api-gestao-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp:true
    });
}


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    DashboardComponent,
    SidnavComponent,

    //novo sistemaServico
    MenuComponent


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
    UsuarioModule,
    PacientesModule,
    ProcedimentoModule,
    ConsultaModule,
    PrimengModule,
    EmpresaModule,
  //novo  sistema-servvico
  ConciliacaoCartaoModule,
  SweetAlert2Module,

  KeycloakAngularModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi:true
    //  },
      // **********Para formatar moeda para real brasileiro**************************
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    // *
    LoginService,
    AuthGuard,
    MensagensService
  ],
  exports:[

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

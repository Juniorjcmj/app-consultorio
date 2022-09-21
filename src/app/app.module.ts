import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


registerLocaleData(ptBr);
// ***

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    DashboardComponent,
    SidnavComponent,


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
    ConsultaModule

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

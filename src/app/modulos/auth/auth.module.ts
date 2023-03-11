import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { AuthRoutingModule } from './auth.route';


import { PrimengModule } from 'src/app/shared/primeng.module';
import { AuthAppComponent } from './auth.app.component';
import { LoginV1Component } from './login-v1/login-v1.component';



@NgModule({
  declarations: [
    LoginComponent,
    ManterUsuarioComponent,
    AuthAppComponent,
    LoginV1Component
  ],
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }

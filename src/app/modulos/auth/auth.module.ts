import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { PrimengModule } from 'src/app/shared/primeng.module';



@NgModule({
  declarations: [
    LoginComponent,
    ManterUsuarioComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAppComponent } from './auth.app.component';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { LoginComponent } from './login/login.component';


const authRouterConfig: Routes = [
    {
       path: '', component: AuthAppComponent,
       children: [
        {path:'cadastro', component: ManterUsuarioComponent },
        {path:'login', component: LoginComponent }
       ]
    }
]


@NgModule({
  imports:[
    RouterModule.forChild(authRouterConfig)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule{}

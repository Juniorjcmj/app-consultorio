import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modulos/home/home.component';
import { LoginComponent } from './modulos/login/login.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';
import { UserGuard } from './guards/user.guard';


const routes: Routes =
[
  {path: 'login', component: LoginComponent},
  {path: '',pathMatch:'full', redirectTo:'login' },

  {
    path: 'home',
     component: HomeComponent,
     canActivate: [AuthGuard]
    },


  {
    path: 'dashboard',
     component: DashboardComponent,
     canActivate: [AuthGuard]
    },

    {
      path: 'usuarios',
       canActivate: [UserGuard],
       loadChildren: ()=> import('./modulos/usuario/usuario.module')
                     .then(m => m.UsuarioModule)
    },
    {
       path: 'compromissos',
       canActivate: [AuthGuard],
       loadChildren: ()=> import('./modulos/agenda/agenda.module')
                     .then(m => m.AgendaModule)
    },

    {
      path: 'pacientes',
      canActivate: [AuthGuard],
      loadChildren: ()=> import('./modulos/pacientes/pacientes.module')
                    .then(m => m.PacientesModule)
   },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

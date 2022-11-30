import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modulos/home/home.component';
import { LoginComponent } from './modulos/login/login.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';



const routes: Routes =
[
  {
    path: 'home',
     component: HomeComponent,
     canActivate: [AuthGuard]
    },
  {path: '',pathMatch:'full', redirectTo:'home' },

  //Novo layout distema servico
  {
    path: 'cartao',
     canActivate: [AuthGuard],
     loadChildren: ()=> import('./modulos/conciliacao-cartao/conciliacao-cartao.module')
                   .then(m => m.ConciliacaoCartaoModule)
  },
  //fim

  {
    path: 'dashboard',
     component: DashboardComponent,
     canActivate: [AuthGuard]
    },

    {
      path: 'usuarios',
       canActivate: [AuthGuard],
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
   {
    path: 'procedimentos',
    canActivate: [AuthGuard],
    loadChildren: ()=> import('./modulos/procedimento/procedimento.module')
                  .then(m => m.ProcedimentoModule)
 },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

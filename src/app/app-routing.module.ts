import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modulos/home/home.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';
import { PageOperadoraComponent } from './modulos/operadora-cartao/page-operadora/page-operadora.component';



const routes: Routes =
[
  {
    path: 'home',
     component: HomeComponent,
     canActivate: [AuthGuard]
    },
  {path: '',pathMatch:'full', redirectTo:'cartao' },

  //Novo layout distema servico
  {
    path: 'cartao',
     canActivate: [AuthGuard],
     loadChildren: ()=> import('./modulos/conciliacao-cartao/conciliacao-cartao.module')
                   .then(m => m.ConciliacaoCartaoModule)
  },
   {
    path:'operadora-cartao', component: PageOperadoraComponent, canActivate: [AuthGuard],
   }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

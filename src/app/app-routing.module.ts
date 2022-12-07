import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modulos/home/home.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';
import { PageOperadoraComponent } from './modulos/operadora-cartao/page-operadora/page-operadora.component';
import { PageEmpresaComponent } from './modulos/empresa/page-empresa/page-empresa.component';



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
    path: 'contas-pagar',
     canActivate: [AuthGuard],
     loadChildren: ()=> import('./modulos/contas-pagar/contas-pagar.module')
                   .then(m => m.ContasPagarModule)
  },
   {
    path:'operadora-cartao', component: PageOperadoraComponent, canActivate: [AuthGuard],
   },
   {
    path:'empresa', component: PageEmpresaComponent, canActivate: [AuthGuard],
   }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modulos/home/home.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';
import { PageOperadoraComponent } from './modulos/operadora-cartao/page-operadora/page-operadora.component';
import { PageEmpresaComponent } from './modulos/empresa/page-empresa/page-empresa.component';
import { PageClassificacaoDespesaComponent } from './modulos/classificacao-despesa/page-classificacao-despesa/page-classificacao-despesa.component';
import { LoginComponent } from './modulos/auth/login/login.component';
import { NotfoundComponent } from './modulos/notfound/notfound.component';
import { ManterUsuarioComponent } from './modulos/auth/manter-usuario/manter-usuario.component';
import { FinanceiroGuard } from './guards/financeiro.guard';
import { AdminGuard } from './guards/admin.guard';
import { ListComponent } from './modulos/conciliacao-cartao/page/list.component';
import { PageViaturaComponent } from './modulos/viatura/page-viatura/page-viatura.component';
import { PageColaboradorComponent } from './modulos/colaborador/page-colaborador/page-colaborador.component';
import { PageFuncaoComponent } from './modulos/colaborador/page-funcao/page-funcao.component';
import { PageEntregaComponent } from './modulos/entrega/page-entrega/page-entrega.component';



const routes: Routes =
[
  { path: '',pathMatch:'full', redirectTo:'home' },

  {path:'home', component: HomeComponent },

  {path:'login', component: LoginComponent },

  { path: 'auth', loadChildren: ()=> import('./modulos/auth/auth.module').then(m => m.AuthModule)},

  { path: 'cartao',canActivate: [AuthGuard],component: ListComponent},

  { path: 'contas-pagar',canActivate: [FinanceiroGuard],loadChildren: ()=> import('./modulos/contas-pagar/contas-pagar.module').then(m => m.ContasPagarModule)},

  { path:'operadora-cartao', component: PageOperadoraComponent, canActivate: [AuthGuard],},

  { path:'empresa', component: PageEmpresaComponent, canActivate: [FinanceiroGuard],},

  { path:'classificacao', component: PageClassificacaoDespesaComponent, canActivate: [FinanceiroGuard],},

  { path:'usuarios', component: ManterUsuarioComponent, canActivate: [AdminGuard],},

  { path: 'viaturas',canActivate: [AuthGuard],component: PageViaturaComponent},

  { path: 'colaborador',canActivate: [AuthGuard],component: PageColaboradorComponent},

  { path: 'entregas',canActivate: [AuthGuard],component: PageEntregaComponent},

  { path: 'funcao',canActivate: [AdminGuard],component: PageFuncaoComponent},

  { path:'**', component: NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

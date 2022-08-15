import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modulos/home/home.component';
import { LoginComponent } from './modulos/login/login.component';
import { DashboardComponent } from './shared/componente/dashboard/dashboard.component';


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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

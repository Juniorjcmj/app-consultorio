import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/shared/material.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { PageUsuarioComponent } from './page-usuario/page-usuario.component';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GrupoListComponent } from './grupo-list/grupo-list.component';



@NgModule({
  declarations: [ UsuarioFormComponent,
                  UsuarioListComponent,
                  PageUsuarioComponent,
                  GrupoFormComponent,
                  GrupoListComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    NgxSpinnerModule,
    MaterialModule

  ],
  providers:[UsuarioService]
})
export class UsuarioModule { }

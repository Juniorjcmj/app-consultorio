
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Grupo } from './model/grupo';
import { UsuarioModel } from './model/usuario';
import { UsuarioGrupo } from './model/usuario-permissao';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"v1/api-usuarios" ;
  apiUrlResourceServeGrupos= environment.apiUrlResourceServer+"v1/api-grupos" ;


constructor(private httpClient: HttpClient,
  private router: Router) { }


  list(){
    return this.httpClient.get<UsuarioModel[]>(`${this.apiUrlResourceServe}` )
    .pipe( );
  }
  save(record: UsuarioModel){

   return  this.httpClient.post<UsuarioModel>(`${this.apiUrlResourceServe}`, record).pipe();
  }
  update(record: UsuarioModel){
    let url = this.apiUrlResourceServe+ "/"+record.id
   return  this.httpClient.put<UsuarioModel>(`${url}`, record).pipe();
  }

  cadastro(record: UsuarioModel){
    if(record.id == null || record.id == undefined){

      return this.save(record);
    }else{

      return this.update(record);
    }
  }

  onDelete(id: any){
    return  this.httpClient.delete(`${this.apiUrlResourceServe}/`+id).pipe();
  }

  onGrupos(){
    return this.httpClient.get<Grupo[]>(`${this.apiUrlResourceServeGrupos}` )
    .pipe( );
  }

  saveGrupo(record: UsuarioGrupo){
    var url = this.apiUrlResourceServe+"/"+record.usuarioId+"/grupos/"+record.grupoId

   return  this.httpClient.put(`${url}`,null).pipe();
  }
  removeGrupo(usuarioId: any, grupoId: any){
    var url = this.apiUrlResourceServe+"/"+usuarioId+"/grupos/"+grupoId

   return  this.httpClient.delete(`${url}`).pipe();
  }
  getGruposByUser(usuarioId: string){
    var url = this.apiUrlResourceServe+"/"+usuarioId+"/grupos/"

   return  this.httpClient.get<Grupo[]>(`${url}`).pipe();
  }

  obterPacientes(){
    var url = this.apiUrlResourceServe+"/pacientes";
    console.log(url);
    return this.httpClient.get<UsuarioModel[]>(`${url}` )
    .pipe( );
  }
}


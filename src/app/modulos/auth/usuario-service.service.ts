import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from './model/usuarioModel';
import { PermissaoModel } from './model/permissaoModel';
import { GrupoModel } from './model/grupoModel';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-usuarios";
  apiPermissao= environment.apiUrlResourceServer+"V1/api-permissao";
  apiGrupos= environment.apiUrlResourceServer+"V1/api-grupos";

  constructor(private httpClient: HttpClient,private router: Router) {

  }
  getAll(): any{
    return this.httpClient.get<UsuarioModel[]>(`${this.apiUrlResourceServe}`)
  }


  manter(record: UsuarioModel) {
    if (record.id == null) {
      return this.manterUsuario(record);
    } else {
      return this.atualizarUsuario(record);
    }
  }
  manterUsuario(record: UsuarioModel) {

    return this.httpClient
      .post<any>(`${this.apiUrlResourceServe}`, record)
      .pipe();
  }
  atualizarUsuario(record: UsuarioModel) {
    return this.httpClient
      .put<any>(`${this.apiUrlResourceServe}`+"?usuarioId="+record.id, record)
      .pipe();
  }
  delete(record: any){

    return  this.httpClient.delete<any>(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
  }
  getById(record: any){
    return  this.httpClient.get(`${this.apiUrlResourceServe}`+"/"+record ).pipe();
  }

  getAllPermissoes(): any{
    return this.httpClient.get<PermissaoModel[]>(`${this.apiPermissao}`)
  }
  getAllGrupo(): any{
    return this.httpClient.get<GrupoModel[]>(`${this.apiGrupos}`)
  }

  novaSenha(id:string, senha: string){
    const url = this.apiUrlResourceServe+"/nova-senha?id="+id+"&senha="+senha
    console.log(url);
    return this.httpClient.get<any>(`${url}`);
  }

}

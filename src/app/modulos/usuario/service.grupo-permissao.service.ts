import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Grupo } from './model/grupo';
import { Permissao } from './model/permissao';


@Injectable({
  providedIn: 'root'
})
export class GrupoPermissaoService {

  apiUrlResourceServeGrupos= environment.apiUrlResourceServer+"v1/api-grupos" ;
  apiUrlPermissoes = environment.apiUrlResourceServer+"v1/api-permissao" ;

  constructor(private httpClient: HttpClient,
  private router: Router) { }

  list(){
    return this.httpClient.get<Grupo[]>(`${this.apiUrlResourceServeGrupos}` )
    .pipe( );
  }
  save(record: Grupo){
    return  this.httpClient.post<Grupo>(`${this.apiUrlResourceServeGrupos}`, record).pipe();
   }
   update(record: Grupo){
     let url = this.apiUrlResourceServeGrupos+ "/"+record.id
    return  this.httpClient.put<Grupo>(`${url}`, record).pipe();
   }
   cadastro(record: Grupo){
     if(record.id == null || record.id == undefined){

       return this.save(record);
     }else{
       return this.update(record);
     }
   }

   onDelete(id: any){
     return  this.httpClient.delete(`${this.apiUrlResourceServeGrupos}/`+id).pipe();
   }

   //CRUD PARA PERMISSAO
   onListPermissoes(){
    return this.httpClient.get<Permissao[]>(`${this.apiUrlPermissoes}` )
    .pipe( );
   }
   onSavePermissoes(record: Permissao){
    return this.httpClient.post<Permissao>(`${this.apiUrlPermissoes}`, record )
    .pipe( );
   }
   onUpdatePermissao(record: Permissao){
    let url = this.apiUrlPermissoes+ "/"+record.id
   return  this.httpClient.put<Permissao>(`${url}`, record).pipe();
  }
  onCadastroOuUpdatePermissao(record: Permissao){
    if(record.id == null || record.id == undefined){

      return this.onSavePermissoes(record);
    }else{
      return this.onUpdatePermissao(record);
    }
  }
  onDeletePermissao(id: any){
    return  this.httpClient.delete(`${this.apiUrlPermissoes}/`+id).pipe();
  }

  associarPermissaoGrupo(record: any){
    var url = this.apiUrlResourceServeGrupos+"/"+record.grupoId+"/permissoes/"+record.permissaoId
    return  this.httpClient.put(`${url}`,null).pipe();
  }
  listpermissoesBygrupo(record: any){
    console.log(record)
    var url = this.apiUrlResourceServeGrupos+"/"+record+"/permissoes/"
    return  this.httpClient.get<Permissao[]>(`${url}`).pipe();
  }
  desassociarPermissaoGrupo(grupoId: any, permissaoId: any){
    var url = this.apiUrlResourceServeGrupos+"/"+grupoId+"/permissoes/"+permissaoId
    return  this.httpClient.delete(`${url}`).pipe();
  }
}

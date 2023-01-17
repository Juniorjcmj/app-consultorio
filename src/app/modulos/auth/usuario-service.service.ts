import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioModel } from './model/usuarioInput';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-usuarios";

  constructor(private httpClient: HttpClient,private router: Router) {

  }
  getAll(): any{
    return this.httpClient.get<UsuarioModel[]>(`${this.apiUrlResourceServe}`)
  }

  manter(record: UsuarioModel) {
    if (record.id == null) {
      return this.manterEmpresa(record);
    } else {
      return this.atualizarEmpresa(record);
    }
  }
  manterEmpresa(record: UsuarioModel) {
    console.log( record)
    return this.httpClient
      .post<any>(`${this.apiUrlResourceServe}`, record)
      .pipe();
  }
  atualizarEmpresa(record: UsuarioModel) {
    return this.httpClient
      .put<any>(`${this.apiUrlResourceServe}`, record)
      .pipe();
  }
  delete(record: any){
    return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
  }
  getById(record: any){
    return  this.httpClient.get(`${this.apiUrlResourceServe}`+"/"+record ).pipe();
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';




@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-empresa";
  constructor( private httpClient: HttpClient,private router: Router) { }

    getAll(){
      return this.httpClient.get<Empresa[]>(`${this.apiUrlResourceServe}`)
    }

    manter(record: Empresa) {
      if (record.id == null) {
        return this.manterEmpresa(record);
      } else {
        return this.atualizarEmpresa(record);
      }
    }
    manterEmpresa(record: Empresa) {
      console.log( record)
      return this.httpClient
        .post<any>(`${this.apiUrlResourceServe}`, record)
        .pipe();
    }
    atualizarEmpresa(record: Empresa) {
      return this.httpClient
        .put<any>(`${this.apiUrlResourceServe}`, record)
        .pipe();
    }
    delete(record: any){
      return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
    }

  }

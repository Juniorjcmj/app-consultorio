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


  }

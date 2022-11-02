import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConciliacaoCartao, PageConciliacao } from '../model/conciliacaoCartao';



@Injectable({
  providedIn: 'root'
})
export class ConciliacaoCartaoService {

   apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-conciliacao/";

  constructor( private httpClient: HttpClient,private router: Router) { }


    getAll(){
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`)
    }

    manterAcompanhamento(record: ConciliacaoCartao){
       if(record.id.valueOf() ){
          return  this.salvarAcompanhamento(record)
       }else{
          return this.alterarAcompanhamento(record)
       }
    }
    salvarAcompanhamento(record: ConciliacaoCartao){
      return  this.httpClient.post<ConciliacaoCartao>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    alterarAcompanhamento(record: ConciliacaoCartao){

      return  this.httpClient.put<ConciliacaoCartao>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    delete(record: any){
      return  this.httpClient.delete<ConciliacaoCartao>(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
    }



  }

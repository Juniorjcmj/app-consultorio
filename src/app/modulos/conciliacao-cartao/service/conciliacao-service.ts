import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConciliacaoCartao, Operadora, PageConciliacao } from '../model/conciliacaoCartao';



@Injectable({
  providedIn: 'root'
})
export class ConciliacaoCartaoService {

   apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-conciliacao/";
   apiUrlResourceServeOperadora= environment.apiUrlResourceServer+"V1/api-operadora-cartao/";

  constructor( private httpClient: HttpClient,private router: Router) { }


    getAll(numeroPagina: any){
      console.log(numeroPagina)
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`+"?sort=data,desc&size=100&page="+numeroPagina)
    }

    alterarCamposGenericos(nome:string, valor:any, id:any){
      var url = this.apiUrlResourceServe+"alterar-antecipacao?id="+id+"&valor="+valor;

      let parametro ={"isAntecipa":valor }

      return  this.httpClient.post<any>(`${url}`, null).pipe();
    }
    alterarRecebidoOuNao(nome:string, valor:any, id:any){
      var url = this.apiUrlResourceServe+"alterar-recebimento?id="+id+"&valor="+valor;

      let parametro ={"isRecebido":valor }

      return  this.httpClient.post<any>(`${url}`, null).pipe();
    }
    alterarConferidoOuNao(nome:string, valor:any, id:any){
      var url = this.apiUrlResourceServe+"alterar-conferido?id="+id+"&valor="+valor;

      let parametro ={"foiConferido":valor }

      return  this.httpClient.post<any>(`${url}`, null).pipe();
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


    getAllOperadora(){
      return this.httpClient.get<Operadora[]>(`${this.apiUrlResourceServeOperadora}`)
    }


  }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConciliacaoCartao, Operadora, PageConciliacao, ConciliacaoCartaoInput } from '../model/conciliacaoCartao';



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

    alterarConferidoOuNao(nome:string, valor:any, id:any){
      var url = this.apiUrlResourceServe+"alterar-conferido?id="+id+"&valor="+valor;

      let parametro ={"foiConferido":valor }

      return  this.httpClient.post<any>(`${url}`, null).pipe();
    }

    manterConciliacao(record: ConciliacaoCartaoInput){
      console.log(record)
       if(record.id == null ){
          return  this.salvarAcompanhamento(record)
       }else{
          return this.alterarAcompanhamento(record)
       }
    }
    salvarAcompanhamento(record: ConciliacaoCartaoInput){
      return  this.httpClient.post<ConciliacaoCartao>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    alterarAcompanhamento(record: ConciliacaoCartaoInput){
      return  this.httpClient.put<ConciliacaoCartao>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    delete(record: any){
      return  this.httpClient.delete(`${this.apiUrlResourceServe}`+record ).pipe();
    }


    alterarDataRecebimento(record: ConciliacaoCartaoInput){
      console.log("chamando editar")
      return  this.httpClient.put<ConciliacaoCartao>(`${this.apiUrlResourceServe}`+"data-recebimento", record).pipe();
    }

    getAllOperadora(){
      return this.httpClient.get<Operadora[]>(`${this.apiUrlResourceServeOperadora}`)
    }


  }

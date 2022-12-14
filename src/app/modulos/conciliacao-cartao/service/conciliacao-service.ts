import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ConciliacaoCartao, Operadora, ConciliacaoCartaoInput, PageConciliacao } from '../model/conciliacaoCartao';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../../auth/auth.service';




@Injectable({
  providedIn: 'root'
})
export class ConciliacaoCartaoService {



   apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-conciliacao";
   apiUrlResourceServeOperadora= environment.apiUrlResourceServer+"V1/api-operadora-cartao";

  constructor( private httpClient: HttpClient,private router: Router,
               private authService: AuthService) { }


    getAll(numeroPagina: any){

      let url = this.apiUrlResourceServe +"/page"
      return this.httpClient.get<PageConciliacao>(`${url}`+"?size=250&page="+numeroPagina)
    }

    alterarConferidoOuNao(nome:string, valor:any, id:any){
      var url = this.apiUrlResourceServe+"/alterar-conferido?id="+id+"&valor="+valor+"&quemConferiu="+this.authService.getUser();
      return  this.httpClient.get<any>(`${url}`).pipe();
    }

    manterConciliacao(record: ConciliacaoCartaoInput){

       if(record.id == null ){
          return  this.salvar(record)
       }else{
          return this.alterar(record)
       }
    }
    salvar(record: ConciliacaoCartaoInput){
      return  this.httpClient.post<ConciliacaoCartao>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    alterar(record: ConciliacaoCartaoInput){
      return  this.httpClient.put<ConciliacaoCartao>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    delete(record: any){
      return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
    }
    alterarDataRecebimento(record: ConciliacaoCartaoInput){
      return  this.httpClient.put<ConciliacaoCartao>(`${this.apiUrlResourceServe}`+"/data-recebimento", record).pipe();
    }
    getAllOperadora(){
      return this.httpClient.get<Operadora[]>(`${this.apiUrlResourceServeOperadora}`)
    }
    //FILTROS
    obterNumeroPedido(filtro: any): any {
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`+"/numero-pedido?numeroPedido="+filtro)
    }
    obterNumeroAute(filtro: any): any {
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`+"/numero-aute?numeroAute="+filtro)
    }
    obterPorData(filtro: any): any {
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`+"/find-data?data="+filtro)
    }
    obterPorEmpresa(filtro: any): any {
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`+"/find-empresa?id="+filtro)
    }

    filtroAvancado(filtro: any, page: number): any {
      return this.httpClient.get<PageConciliacao>(`${this.apiUrlResourceServe}`+"/filter?idEmpresa="+filtro.idEmpresa+"&idOperadora="+filtro.idOperadora
      +"&dtInicio="+filtro.dtInicio+"&dtFim="+filtro.dtFim+"&numeroPedido="+filtro.numeroPedido+"&aute="+filtro.aute+"&dataRecebimento="+filtro.dataRecebimento
      +"&previsaoRecebimento="+filtro.previsaoRecebimento+"&tipoOperacao="+filtro.tipoOperacao+"&isRecebido="+filtro.isRecebido +"&page="+page)
    }
  }

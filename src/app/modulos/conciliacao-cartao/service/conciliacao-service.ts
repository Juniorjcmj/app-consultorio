import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ConciliacaoCartao, Operadora, ConciliacaoCartaoInput, PageConciliacao } from '../model/conciliacaoCartao';

import { AuthService } from '../../auth/auth.service';
import { FiltroConciliacao } from '../model/filtroConciliacao';
import { CustomLocalStorageService } from '../../../services/custom-local-storage.service';
import { UpdateGenericoConciliacao } from '../model/updateGenericoConciliacao';




@Injectable({
  providedIn: 'root'
})
export class ConciliacaoCartaoService {

apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-conciliacao";
apiUrlResourceServeOperadora= environment.apiUrlResourceServer+"V1/api-operadora-cartao";

  constructor( private httpClient: HttpClient,
               private router: Router,
               private authService: AuthService,
               private serviceStorage : CustomLocalStorageService) { }


    getAll(numeroPagina: any){

      let url = this.apiUrlResourceServe +"/page"
      return this.httpClient.get<PageConciliacao>(`${url}`+"?size=500&page="+numeroPagina)
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
      return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record).pipe();
    }

    alterarDataRecebimento(record: UpdateGenericoConciliacao){
     record.filtro = this.serviceStorage.get("filtroConciliacao");
     record.foiConferido = record.foiConferido === "SIM" ? "true" : "false";

      return  this.httpClient.put<PageConciliacao>(`${this.apiUrlResourceServe}`+"/data-recebimento", record).pipe();
    }

    alterarConferidoOuNao(record: UpdateGenericoConciliacao){
      record.filtro = this.serviceStorage.get("filtroConciliacao");
      return  this.httpClient.put<PageConciliacao>(`${this.apiUrlResourceServe}`+"/alterar-conferido", record).pipe();
    }

    getAllOperadora(){
      return this.httpClient.get<Operadora[]>(`${this.apiUrlResourceServeOperadora}`)
    }

    filtroConciliacao(filtro: FiltroConciliacao): any {
      this.serviceStorage.remove("filtroConciliacao");
      this.serviceStorage.set("filtroConciliacao", filtro);
      return this.httpClient.post<PageConciliacao>(`${this.apiUrlResourceServe}`+ "/filtro-avancado?size="+5000, filtro);
    }

    alterarValorRecebido(record: UpdateGenericoConciliacao){
      record.filtro = this.serviceStorage.get("filtroConciliacao");
      return  this.httpClient.put<PageConciliacao>(`${this.apiUrlResourceServe}`+"/alterar-valor-receber", record).pipe();
    }

  }

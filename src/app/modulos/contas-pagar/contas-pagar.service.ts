import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { ContasPagarInput } from './model/contasPagarInput';
import { ContasPagarDTO } from './model/contasPagarDTO';
import { FiltroAvancado } from './model/filtro';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ContasPagarUpdateGenerico } from './model/contasPagarUpdateGenerico';

@Injectable({
  providedIn: 'root'
})
export class ContasPagarService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-contas-pagar";

  listaContaPagar: Subject<any> = new Subject()

  constructor(private httpClient: HttpClient,private router: Router,
    private keycloakService: KeycloakService) { }


    setListaContasPagar(newValue:any){
      this.listaContaPagar.next(newValue);
    }
    getListaContasPagar(): Observable<any>{
      return this.listaContaPagar.asObservable();
    }

  manterContasPagar(record: ContasPagarInput): Observable<ContasPagarDTO[]>{
      if(record.id == null ){
         return  this.salvarContas(record)
      }else{
         return this.alterarContas(record)
      }
   }
   salvarContas(record: ContasPagarInput){

     return  this.httpClient.post<ContasPagarDTO[]>(`${this.apiUrlResourceServe}`, record).pipe();
   }
   alterarContas(record: ContasPagarInput){
     return  this.httpClient.put<ContasPagarDTO[]>(`${this.apiUrlResourceServe}`, record).pipe();
   }
   delete(record: any){
     return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
   }
   deleteEmLote(record: any){

    return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"/delete-lote?numeroDocumento="+record['numeroDocumento'] ).pipe();
  }

  manterDataPagamento(record: ContasPagarUpdateGenerico){
    return  this.httpClient.put(`${this.apiUrlResourceServe}`+"/update-data-pagamento", record ).pipe();
  }
  manterDesconto(record: ContasPagarUpdateGenerico){
    return  this.httpClient.put(`${this.apiUrlResourceServe}`+"/update-desconto", record ).pipe();
  }
  manterLocalPgto(record: ContasPagarUpdateGenerico){
    return  this.httpClient.put(`${this.apiUrlResourceServe}`+"/update-local-pagamento", record ).pipe();
  }
  manterJurosMulta(record: ContasPagarUpdateGenerico){
    return  this.httpClient.put(`${this.apiUrlResourceServe}`+"/update-juros-multa", record ).pipe();
  }

    //FILTROS
    filtroAvancadoAvancado(filtro: FiltroAvancado): any {
      return this.httpClient.post<ContasPagarDTO>(`${this.apiUrlResourceServe}`+"/filtro-avancadissimo",filtro);
    }
}

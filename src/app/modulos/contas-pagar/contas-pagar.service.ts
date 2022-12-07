import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { ContasPagarInput } from './model/contasPagarInput';
import { ContasPagarDTO } from './model/contasPagarDTO';
import { Filtro } from './model/filtro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContasPagarService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-contas-pagar";

  constructor(private httpClient: HttpClient,private router: Router,
    private keycloakService: KeycloakService) { }

  manterContasPagar(record: ContasPagarInput): Observable<ContasPagarDTO[]>{
      if(record.id == null ){
         return  this.salvarAcompanhamento(record)
      }else{
         return this.alterarAcompanhamento(record)
      }
   }
   salvarAcompanhamento(record: ContasPagarInput){
     return  this.httpClient.post<ContasPagarDTO[]>(`${this.apiUrlResourceServe}`, record).pipe();
   }
   alterarAcompanhamento(record: ContasPagarInput){
     return  this.httpClient.put<ContasPagarDTO[]>(`${this.apiUrlResourceServe}`, record).pipe();
   }
   delete(record: any){
     return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
   }
   manterDataPagamento(record: any){
    console.log("service")
    return  this.httpClient.get<ContasPagarDTO[]>(`${this.apiUrlResourceServe}`
    +"/update-data-pagamento?id="+ record.id +"&dataPagamento="+record.dataPagamentoEdit ).pipe();
  }

    //FILTROS
    filtroAvancado(filtro: Filtro): any {

      return this.httpClient.get<ContasPagarDTO>(`${this.apiUrlResourceServe}`+"/filtro-avancado?dtInicio="+filtro.dtInicio+
                                                                                                "&dtFim="+filtro.dtFim+
                                                                                                "&classificacao="+filtro.classificacao+
                                                                                                "&subclassificacao="+filtro.subclassificacao+
                                                                                                "&situacao="+filtro.situacao+
                                                                                                "&formaPagamento="+filtro.formaPagamento+
                                                                                                "&fornecedor="+filtro.fornecedor+
                                                                                                "&idEmpresa="+filtro.idEmpresa+
                                                                                                "&tipoDespesa="+filtro.tipoDespesa);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { Operadora } from '../conciliacao-cartao/model/conciliacaoCartao';
import { OperadoraPage } from './page-operadora/operadoraPage';

@Injectable({
  providedIn: 'root',
})
export class OperadoraCartaoService {

  apiUrlResourceServeOperadora =
    environment.apiUrlResourceServer + 'V1/api-operadora-cartao';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  manter(record: any) {
    if (record.id == null) {

      return this.manterOperadora(record);
    } else {
      return this.atualizarOperadora(record);
    }
  }
  manterOperadora(record: any) {

    return this.httpClient
      .post<any>(`${this.apiUrlResourceServeOperadora}`, record)
      .pipe();
  }
  atualizarOperadora(record: any) {

    return this.httpClient
      .put<any>(`${this.apiUrlResourceServeOperadora}`, record)
      .pipe();
  }
  getAllOperadora() {
    return this.httpClient.get<OperadoraPage>(
      `${this.apiUrlResourceServeOperadora}`+"/page"
    );
  }
  getAllOperadoraPage(size: any, number: any) {
    return this.httpClient.get<OperadoraPage>(
      `${this.apiUrlResourceServeOperadora}`+ "/page?size="+size+"&page="+number
    );
  }
  getAllOperadoraDesativada(size: any, number: any) {

    return this.httpClient.get<Operadora[]>(
      `${this.apiUrlResourceServeOperadora}`+"/desativadas?size="+size+"&page="+number
    );
  }
  delete(record: any){
    return  this.httpClient.delete(`${this.apiUrlResourceServeOperadora}`+"/"+record ).pipe();
  }
  desativarOperadora(id: number) {
    return  this.httpClient.get(`${this.apiUrlResourceServeOperadora}`+"/desativar/"+id ).pipe();
 }
}

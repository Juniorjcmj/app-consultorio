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
import { ContasPagarPage } from './page-contas-pagar/contasPagarPage';

@Injectable({
  providedIn: 'root',
})
export class ContasPagarService {
  apiUrlResourceServe =
    environment.apiUrlResourceServer + 'V1/api-contas-pagar';

  pagePagar: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) {}

  setListaContasPagar(newValue: any) {
    this.pagePagar.next(newValue);
  }
  getListaContasPagar(): Observable<any> {
    return this.pagePagar.asObservable();
  }

  manterContasPagar(record: ContasPagarInput): any {
    if (record.id == null) {
      return this.salvarContas(record);
    } else {
      return this.alterarContas(record);
    }
  }
  salvarContas(record: any): any {
    return this.httpClient
      .post<ContasPagarPage>(`${this.apiUrlResourceServe}`, record)
      .pipe();
  }

  alterarContas(record: ContasPagarInput): any {
    return this.httpClient
      .put<ContasPagarPage>(`${this.apiUrlResourceServe}`, record)
      .pipe();
  }

  delete(record: any) {
    return this.httpClient
      .delete(`${this.apiUrlResourceServe}` + '?id=' + record)
      .pipe();
  }

  deleteEmLote(record: any) {
    return this.httpClient
      .delete(
        `${this.apiUrlResourceServe}` +
          '/delete-lote?numeroDocumento=' +
          record['numeroDocumento']
      )
      .pipe();
  }

  manterDataPagamento(record: ContasPagarUpdateGenerico) {
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-data-pagamento', record)
      .pipe();
  }
  manterDesconto(record: ContasPagarUpdateGenerico) {
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-desconto', record)
      .pipe();
  }
  manterLocalPgto(record: ContasPagarUpdateGenerico) {
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-local-pagamento', record)
      .pipe();
  }
  manterJurosMulta(record: ContasPagarUpdateGenerico) {
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-juros-multa', record)
      .pipe();
  }

  //FILTROS
  filtroAvancadoAvancado(filtro: FiltroAvancado): any {
    return this.httpClient.post<ContasPagarPage>(
      `${this.apiUrlResourceServe}` + '/filtro-avancadissimo?size=500',
      filtro
    );
  }
}

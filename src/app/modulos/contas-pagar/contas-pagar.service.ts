import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContasPagarInput } from './model/contasPagarInput';
import { FiltroAvancado } from './model/filtro';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ContasPagarUpdateGenerico } from './model/contasPagarUpdateGenerico';
import { ContasPagarPage } from './page-contas-pagar/contasPagarPage';
import { CustomLocalStorageService } from 'src/app/services/custom-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContasPagarService {
  apiUrlResourceServe =
    environment.apiUrlResourceServer + 'V1/api-contas-pagar';

  pagePagar: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router,
    private customStorage: CustomLocalStorageService) {}

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
    console.log(record)
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
    return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record).pipe();
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
  deleteSituacaoPendente(record: any) {
    return this.httpClient
      .delete(
        `${this.apiUrlResourceServe}` +
          '/delete-em-aberto?numeroDocumento=' +
          record['numeroDocumento']
      )
      .pipe();
  }

  manterDataPagamento(record: ContasPagarUpdateGenerico): any {
    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-data-pagamento', record)
      .pipe();
  }
  manterDesconto(record: ContasPagarUpdateGenerico):any {
    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-desconto', record)
      .pipe();
  }
  manterValorDuplicata(record: ContasPagarUpdateGenerico):any {
    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-valor-duplicata', record)
      .pipe();
  }
  manterLocalPgto(record: ContasPagarUpdateGenerico):any {
    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-local-pagamento', record)
      .pipe();
  }
  manterJurosMulta(record: ContasPagarUpdateGenerico):any {
    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-juros-multa', record)
      .pipe();
  }

  //FILTROS
  filtroAvancadoAvancado(filtro: FiltroAvancado): any {
    this.customStorage.remove("filtro")
    this.customStorage.set("filtro",filtro);
    return this.httpClient.post<ContasPagarPage>(
      `${this.apiUrlResourceServe}` + '/filtro-avancadissimo?size=500',
      filtro
    );
  }
  relatorioContabil(filtro: FiltroAvancado): any {

    let headers =
    new HttpHeaders({'responseType': 'blob'});

    return this.httpClient.post<Blob>(
      `${this.apiUrlResourceServe}` + '/xlsx1?size=10000',
      filtro, { headers: headers }
    ).pipe();
  }

  getDespesasUltimosSeisMeses() {
    return  this.httpClient.get<any>(`${this.apiUrlResourceServe}`+"/total-seis-meses").pipe();
  }
  getDespesasUltimosSeisMesesPorTipo(record: any) {
    return  this.httpClient.get<any>(`${this.apiUrlResourceServe}`+"/total-seis-meses-tipo?tipoDespesa="+record).pipe();
  }

}

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  manterDataVencimento(record: ContasPagarUpdateGenerico): any {
    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-data-vencimento', record)
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
  manterFormaPagamento(record: ContasPagarUpdateGenerico) {

    record.filtro = this.customStorage.get("filtro") as FiltroAvancado;
    return this.httpClient
      .put(`${this.apiUrlResourceServe}` + '/update-forma-pagamento', record)
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

  public getUserXls(filtro: FiltroAvancado): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ms-excel'
    });
    return this.httpClient.post<Blob>(`${environment.apiUrlResourceServer}pdf/contas/xls?size=10000`,filtro, {
      headers: headers,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }


  public getContasAgrupasdasXls(filtro: FiltroAvancado): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ms-excel'
    });
    return this.httpClient.post<Blob>(`${environment.apiUrlResourceServer}pdf/contas-agrupadas/xls?size=10000`,filtro, {
      headers: headers,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }

  public getContasAgrupasdasFornecedorXls(filtro: FiltroAvancado): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ms-excel'
    });
    return this.httpClient.post<Blob>(`${environment.apiUrlResourceServer}pdf/contas-agrupadas-fornecedor/xls?size=10000`,filtro, {
      headers: headers,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }

  //TRABALHANDO COM MARQUIVOS
  salvarBoleto(formData: FormData) {

    return this.httpClient.post(`${this.apiUrlResourceServe}/novo-boleto`, formData);
  }
  salvarComprovante(formData: FormData) {

    return this.httpClient.post(`${this.apiUrlResourceServe}/novo-comprovante`, formData);
  }
  downloadBoleto(formData: FormData){
    return this.httpClient.post(`${this.apiUrlResourceServe}/download-boleto`+"?id=",formData, {responseType:'blob'});
  }
  deleteBoleto(formData: FormData){
    return this.httpClient.post(`${this.apiUrlResourceServe}/delete-boleto`+"?id=",formData);
  }
  downloadComprovante(formData: FormData){
    return this.httpClient.post(`${this.apiUrlResourceServe}/download-comprovante`+"?id=",formData, {responseType:'blob'});
  }
  deleteComprovante(formData: FormData){
    return this.httpClient.post(`${this.apiUrlResourceServe}/delete-comprovante`+"?id=",formData);
  }


}

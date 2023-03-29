import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credito } from './model/credito';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  apiUrl =  environment.apiUrlResourceServer + 'V1/api-credito';
  constructor(
    private httpClient: HttpClient
  ) {}
  manter(record: any) {
    if (record.id == null) {

      return this.manterCredito(record);
    } else {
      return this.atualizar(record);
    }
  }
  manterCredito(record: any) {

    return this.httpClient
      .post<any>(`${this.apiUrl}`, record)
      .pipe();
  }
  atualizar(record: any) {

    return this.httpClient
      .put<any>(`${this.apiUrl}`, record)
      .pipe();
  }
  getAll() {
    return this.httpClient.get<Credito[]>(
      `${this.apiUrl}`
    );
  }

  delete(record: any){
    return  this.httpClient.delete(`${this.apiUrl}`+"?id="+record ).pipe();
  }





}

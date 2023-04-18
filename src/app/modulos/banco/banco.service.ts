import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banco } from './banco';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  apiUrl =  environment.apiUrlResourceServer + 'V1/api-banco';
  constructor(
    private httpClient: HttpClient
  ) {}
  manter(record: any) {
    if (record.id == null) {

      return this.manterBanco(record);
    } else {
      return this.atualizar(record);
    }
  }
  manterBanco(record: any) {

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
    return this.httpClient.get<Banco[]>(
      `${this.apiUrl}`
    );
  }

  delete(record: any){
    return  this.httpClient.delete(`${this.apiUrl}`+"?id="+record ).pipe();
  }

}

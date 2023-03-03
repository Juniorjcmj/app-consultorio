import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Entrega } from './model/entrega';
import { Colaborador } from '../colaborador/model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  apiUrl =  environment.apiUrlResourceServer + 'V1/api-entregas';
  constructor(
    private httpClient: HttpClient
  ) {}
  manter(record: any) {
    if (record.id == null) {

      return this.manterViatura(record);
    } else {
      return this.atualizarAtualizar(record);
    }
  }
  manterViatura(record: any) {

    return this.httpClient
      .post<any>(`${this.apiUrl}`, record)
      .pipe();
  }
  atualizarAtualizar(record: any) {

    return this.httpClient
      .put<any>(`${this.apiUrl}`, record)
      .pipe();
  }
  getAll() {
    return this.httpClient.get<Entrega[]>(
      `${this.apiUrl}`
    );
  }

  delete(record: any){
    return  this.httpClient.delete(`${this.apiUrl}`+"?id="+record ).pipe();
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Viatura } from './model/viatura';

@Injectable({
  providedIn: 'root'
})
export class ViaturaService {

  apiUrl =  environment.apiUrlResourceServer + 'V1/api-viaturas';
constructor(
  private httpClient: HttpClient,
  private router: Router,

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
  return this.httpClient.get<Viatura>(
    `${this.apiUrl}`
  );
}

delete(record: any){
  return  this.httpClient.delete(`${this.apiUrl}`+"?id="+record ).pipe();
}


}

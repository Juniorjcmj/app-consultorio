import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Colaborador } from './model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  apiUrl =  environment.apiUrlResourceServer + 'V1/api-colaborador';
constructor(
  private httpClient: HttpClient,
  private router: Router,

) {}

manter(record: any) {
  if (record.id == null) {

    return this.cadastrar(record);
  } else {
    return this.atualizar(record);
  }
}
cadastrar(record: any) {

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
  return this.httpClient.get<Colaborador>(
    `${this.apiUrl}`
  );
}

delete(record: any){
  return  this.httpClient.delete(`${this.apiUrl}`+"?id="+record ).pipe();
}
}

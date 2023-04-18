import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Comprovante, ComprovanteFiltro, ComprovanteInput } from './comprovante';

@Injectable({
  providedIn: 'root'
})
export class ComprovanteService {
  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-comprovante";

  constructor(private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService) { }

    manter(record: ComprovanteInput){

      if(record.id == null ){
         return  this.salvar(record)
      }else{
         return this.alterar(record)
      }
   }

   salvar(record: ComprovanteInput){
     return  this.httpClient.post<ComprovanteInput>(`${this.apiUrlResourceServe}`, record).pipe();
   }

   alterar(record: ComprovanteInput){
     return  this.httpClient.put<ComprovanteInput>(`${this.apiUrlResourceServe}`, record).pipe();
   }
   delete(record: any){
    return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record).pipe();
  }
  filtroAvancado(filtro: ComprovanteFiltro): any {
    return this.httpClient.post<Comprovante>(`${this.apiUrlResourceServe}`+ "/filtro-avancado?size="+5000, filtro);
  }


}

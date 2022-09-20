import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Procedimento } from './procedimento-model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {
  api= environment.apiUrlResourceServer+"v1/api-procedimentos" ;
  constructor(private httpClient: HttpClient,
    private router: Router) { }


    list(){
      return this.httpClient.get<Procedimento[]>(`${this.api}` )
      .pipe( );
    }
    save(record: Procedimento){

     return  this.httpClient.post<Procedimento>(`${this.api}`, record).pipe();
    }
    update(record: Procedimento){
      let url = this.api+ "/"+record.id
     return  this.httpClient.put<Procedimento>(`${url}`, record).pipe();
    }

    cadastro(record: Procedimento){
      if(record.id == null || record.id == undefined){

        return this.save(record);
      }else{

        return this.update(record);
      }
    }

    onDelete(id: any){
      return  this.httpClient.delete(`${this.api}/`+id).pipe();
    }


}

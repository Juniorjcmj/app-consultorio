import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConsultaModel } from './consulta-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  api= environment.apiUrlResourceServer+"v1/api-consultas" ;
  constructor(private httpClient: HttpClient,
    private router: Router) { }

    list(){
      return this.httpClient.get<ConsultaModel[]>(`${this.api}` )
      .pipe( );
    }
    save(record: ConsultaModel){

     return  this.httpClient.post<ConsultaModel>(`${this.api}`, record).pipe();
    }
    update(record: ConsultaModel){
      let url = this.api+ "/"+record.id
     return  this.httpClient.put<ConsultaModel>(`${url}`, record).pipe();
    }

    cadastro(record: ConsultaModel){
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

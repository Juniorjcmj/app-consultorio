import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassificacaoDespesa, SubClassificacaoDespesa } from './classificacao-despesa';

@Injectable({
  providedIn: 'root'
})
export class ClassificacaoDespesaService {

  apiUrlResourceServe= environment.apiUrlResourceServer+"V1/api-classificacao-despesa";
  apiUrlResourceServeSub= environment.apiUrlResourceServer+"V1/api-subclassificacao-despesa";

  constructor(private httpClient: HttpClient,private router: Router,
    private keycloakService: KeycloakService) { }



  manterClassificacao(record: ClassificacaoDespesa): Observable<ClassificacaoDespesa[]>{
    if(record.id == null ){
       return  this.salvar(record)
    }else{
       return this.alterar(record)
    }
 }
    salvar(record: ClassificacaoDespesa){

      return  this.httpClient.post<ClassificacaoDespesa[]>(`${this.apiUrlResourceServe}`, record).pipe();
    }
    alterar(record: ClassificacaoDespesa){
      return  this.httpClient.put<ClassificacaoDespesa[]>(`${this.apiUrlResourceServe}`, record).pipe();
    }

    delete(record: any){
      return  this.httpClient.delete(`${this.apiUrlResourceServe}`+"?id="+record ).pipe();
    }

    getAllClassificacao(){
      return this.httpClient.get<ClassificacaoDespesa>(`${this.apiUrlResourceServe}`).pipe();
    }


    //SUBCLASSIFICAÇÃO

    manterSub(idClassificacao:any ,record: SubClassificacaoDespesa): Observable<SubClassificacaoDespesa[]>{

      if(record.id == null ){
         return  this.salvarSub(idClassificacao, record.descricao)
      }else{
         return this.alterarSub(record.id, record.descricao)
      }
   }
      salvarSub(idClassificacao: any,descricaoSubClassificacao: any){

        return  this.httpClient.post<SubClassificacaoDespesa[]>(`${this.apiUrlResourceServeSub}`+"?descricaoSubClassificacao="+descricaoSubClassificacao+"&idClassificacao="+idClassificacao, null).pipe();
      }
      alterarSub(idClassificacao: any,descricaoSubClassificacao: any){
      console.log("chamando alteração")

        return  this.httpClient.put<SubClassificacaoDespesa[]>(`${this.apiUrlResourceServeSub}`+"?descricaoSubClassificacao="+descricaoSubClassificacao+"&idSubClassificacao="+idClassificacao, null).pipe();
      }

      deleteSub(idClassificacao: any,descricaoSubClassificacao: any ){
        return  this.httpClient.delete(`${this.apiUrlResourceServeSub}`+"/delete-subclassificacao?idClassificacao="+idClassificacao+"&descricaoSubClassificacao="+descricaoSubClassificacao ).pipe();
      }
}

import { Data } from "@angular/router";
import { Colaborador } from '../../colaborador/model/colaborador';
import { Viatura } from '../../viatura/model/viatura';

export class EntregaInput{
  id!:number
  dataSaida!: Data;
  horaRetorno!:string;
  horaSaida!:string;
  numeroPedido!:string;
  status!:string;
  odometro!:string;
  descricao!:string;
  idViatura!:number;
  idColaboradorMotorista!:number;
  idColaboradorResponsavel!:number;
  }
  export class Entrega{
    id!:number
    dataSaida!: Data;
    horaRetorno!:string;
    horaSaida!:string;
    numeroPedido!:string;
    status!:string;
    odometro!:string;
    descricao!:string;
    viatura!:Viatura;
    motorista:Colaborador = new Colaborador();
    responsavel:Colaborador = new Colaborador();;
    }

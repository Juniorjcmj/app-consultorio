import { Data } from "@angular/router";
import { Colaborador } from '../../colaborador/model/colaborador';
import { Viatura } from '../../viatura/model/viatura';

export class EntregaInput{
  id!:number
  dataSaida!: string;
  horaRetorno!:string;
  horaSaida!:string;
  numeroPedido!:string;
  status!:string;
  odometroEntrada!:string;
  odometroSaida!:string;
  descricao!:string;
  idViatura!:number;
  idColaboradorMotorista!:number;
  idColaboradorResponsavel!:number;
  }
  export class Entrega{
    id!:number
    dataSaida!: string;
    horaRetorno!:string;
    horaSaida!:string;
    numeroPedido!:string;
    status!:string;
    odometroEntrada!:string;
    odometroSaida!:string;
    descricao!:string;
    viatura!:Viatura;
    motorista:Colaborador = new Colaborador();
    responsavel:Colaborador = new Colaborador();;
    }


export class FiltroAvancadoEntrega{
  dataSaidaInicial	!: string;
  dataSaidaFinal!: string;
  idViatura!:string[];
  idColaboradorMotorista!:string[];
  idColaboradorResponsavel!:string[];
  numeroPedido!:string;

  }

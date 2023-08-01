import { FiltroConciliacao } from './filtroConciliacao';
export class UpdateGenericoConciliacao{

  id!:string;
  foiConferido!: string;
  dataRecebimento!: string;
  filtro!: FiltroConciliacao;
  quemConferiu!: string;
  valorReceber!: string;

}


export class ConciliacaoCartao{

  id!: number;
  data!: Date;
  previsaoRecebimento!:Date;
  dataRecebimento!: Date;
  dataCriacao!: Date;
  dataAtualizacao!: Date;
  numeroPedido!: string;
  isAntecipa!:boolean;
  isRecebido!: boolean;
  foiConferido!: boolean;
  tipoOperacao!: string;
  valorPedido!: number;
  valorReceber!: number;
  valorTaxaAntecipacao!: number;
  valorTaxaPadrao!: number;
  quemCadastrou!: string;
  quemConferiu!: string;
  empresa!: Empresa;
  operadora!: Operadora;



}

export interface Operadora{

  id: number
  nome : string;
	bandeira: string;
  status: string;
  antecipacaoAutomatica: string;
  diasParaRecebimento: string;
  taxaAntecipacaoCredito: string;
  taxaPadraoCredito: string;
  taxaAntecipacaoDebito: string;
  taxaPadraoDebito: string;
  inicio: string;
  fim: string;

}
export interface Empresa{
  id : number;
	nome: string;
	cnpj: string;
	endereco: string;
	telFixo: string;
	telMovel: string;
	email: string;
}

export interface PageConciliacao{
  content: ConciliacaoCartao[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size:number;
  first:boolean;
  numberOfElements:number;
  empty:boolean;
}

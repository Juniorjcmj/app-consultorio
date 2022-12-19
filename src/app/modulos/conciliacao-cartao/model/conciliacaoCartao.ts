
export class ConciliacaoCartao{

  id!: number;
  data!: Date;
  previsaoRecebimento!:Date;
  dataRecebimento!: Date;
  dataCriacao!: Date;
  dataAtualizacao!: Date;
  numeroPedido!: string;
  isAntecipa!:string;
  isRecebido!: string;
  foiConferido!: string;
  tipoOperacao!: string;
  valorPedido!: number;
  valorReceber!: number;
  valorTaxaAntecipacao!: number;
  valorTaxaPadrao!: number;
  quemCadastrou!: string;
  quemConferiu!: string;
  idEmpresa!: string;
  nomeEmpresa!:string;
  idOperadora!:string;
  nomeOperadora!:string;
  aute!: string;

}

export class ConciliacaoCartaoInput{
  id!: number;
  data!: Date;
  dataRecebimento!: Date;
  numeroPedido!: string;
  tipoOperacao!: string;
  valorPedido!: number;
  idEmpresa!: string;
  idOperadora!:string;
  aute!: string;
  quemCadastrou!: string;
  quemConferiu!:string;

  constructor(model:ConciliacaoCartao){
    this.id = model.id;
    this.aute = model.aute;
    this.data = model.data;
    this.idEmpresa = model.idEmpresa;
    this.idOperadora = model.idOperadora;
    this.numeroPedido = model.numeroPedido;
    this.valorPedido = model.valorPedido;
    this.tipoOperacao = model.tipoOperacao;
    this.quemCadastrou = model.quemCadastrou;
    this.quemConferiu = model.quemConferiu;

  }
}

export class Operadora{

  id!: number
  nome! : string;
	bandeira!: string;
  status!: string;
  antecipacaoAutomatica!: string;
  diasParaRecebimento!: string;
  taxaAntecipacaoCredito!: string;
  taxaPadraoCredito!: string;
  taxaAntecipacaoDebito!: string;
  taxaPadraoDebito!: string;
  inicio!: string;
  fim!: string;
  nomeBandeira!: string;
  statusViews!: string;
  antecipacaoAutomaticaViews!: string;

}
export class Empresa{
  id! : string;
	nome!: string;
	cnpj!: string;
	endereco!: string;
	telFixo!: string;
	telMovel!: string;
	email!: string;
}

export class PageConciliacao{
  content!: ConciliacaoCartao[];
  empty!:boolean;
  first!:boolean;
  last!: boolean;
  number!: number;
  totalPages!: number;
  totalElements!: number;
  size!:number;
  numberOfElements!:number;
}


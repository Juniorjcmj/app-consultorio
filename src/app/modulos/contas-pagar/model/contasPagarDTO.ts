import { ContasPagarInput } from './contasPagarInput';

export class ContasPagarDTO extends ContasPagarInput{
       jurosMulta!: string;
       valorPago!: string;
       desconto!: string;
       localPagamento!: string;
       situacao!: string;
       isAprovado!: boolean;
       nomeEmpresa!: string;
       empresaId!: string;
       dataPagamento!: string;
       parcela!:	string;
       isPedirBoleto!:	boolean;
       pathComprovante!: string;
       pathBoleto!:string;




}

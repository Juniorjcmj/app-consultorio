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
       dataPagamento!: Date;
       parcela!:	string;
       isPedirBoleto!:	boolean;




}

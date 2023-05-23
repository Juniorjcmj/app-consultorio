import { LocalDate } from "src/app/shared/localDate";
import { Banco } from "../banco/banco";
import { Empresa } from "../conciliacao-cartao/model/conciliacaoCartao";

export class ComprovanteInput{
  id!: number;
  bancoId!: number;
  empresaId!: number;
  numeroPedido!: string;
  nomeCliente!: string;
  numeroDocumento!: string;
  data!: Date;
  valor!: string;
  tipo!: string;
  file!: File

}
export class ComprovanteFiltro{
  id!: number;
  bancoId!: number;
  empresaId!: number;
  numeroPedido!: string;
  nomeCliente!: string;
  numeroDocumento!: string;
  dataInicial!: LocalDate;
  dataFinal!: LocalDate;
  valor!: string;
  tipo!: string;

}
export class Comprovante{
  id!: number;
  banco!: Banco;
  empresa!: Empresa;
  numeroPedido!: string;
  nomeCliente!: string;
  numeroDocumento!: string;
  data!: string;
  valor!: string;
  tipo!: string;
  file!: File

}

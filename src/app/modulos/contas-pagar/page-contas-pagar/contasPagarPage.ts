import { ContasPagarDTO } from "../model/contasPagarDTO";

export interface ContasPagarPage{

content: ContasPagarDTO[];
 last: boolean;
 totalPages: number;
 totalElements: number;
 size: number;
 number: number;
 first: boolean;
 numberOfElements: number;
 empty: boolean;
 totalPago: string;
 totalPendente: string;
}

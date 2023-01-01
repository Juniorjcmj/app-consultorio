import { Operadora } from "../../conciliacao-cartao/model/conciliacaoCartao";

export interface operadoraPage{

content: Operadora[];
 last: boolean;
 totalPages: number;
 totalElements: number;
 size: number;
 number: number;
 first: boolean;
 numberOfElements: number;
 empty: boolean;
}

import { ConciliacaoCartao } from "../model/conciliacaoCartao";

export interface ConciliacaoPage{

  content: ConciliacaoCartao[];
 last: boolean;
 totalPages: number;
 totalElements: number;
 size: number;
 number: number;
 first: boolean;
 numberOfElements: number;
 empty: boolean;
}

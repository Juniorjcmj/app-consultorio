import { LocalDate } from "src/app/shared/localDate";

export class Credito{
  id!: number;
  inicio!: LocalDate;
  fim!: Date;
  credito!: number;
  debito!: number;
  debitoPrevisto!: number;
  periodo!: string;
  saldo!: number;
  situacao!: string;
}

export class InputCredito{
  id!: number;
  inicio!: LocalDate;
  credito!: number;

}

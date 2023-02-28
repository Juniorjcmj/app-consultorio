import { Funcao } from './funcao';
export class ColaboradorInput{
  id!:number
  nome!: 	string
  identidade!:	string
  idFuncao!:	number
  cnh!:	string
  tipoCnh!: 	string
  cpf!:	string
  dataNascimento!:	Date
  ativo!:	boolean
  }
  export class Colaborador{
    id!:number
    nome!: 	string
    identidade!:	string
    funcao!:	Funcao
    cnh!:	string
    tipoCnh!: 	string
    cpf!:	string
    dataNascimento!:	Date
    ativo!:	boolean

    }

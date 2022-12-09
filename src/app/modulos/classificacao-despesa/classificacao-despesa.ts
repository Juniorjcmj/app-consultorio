export class SubClassificacaoDespesa{

  id!: string;
  descricao!: string;
}

export class ClassificacaoDespesa{

  id!: string;
  descricao!: string;
  subClassificacao!: SubClassificacaoDespesa[];
}

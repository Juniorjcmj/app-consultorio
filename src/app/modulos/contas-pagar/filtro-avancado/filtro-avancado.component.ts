import { ContasPagarPage } from './../page-contas-pagar/contasPagarPage';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Observable, tap, catchError, of } from 'rxjs';
import { ContasPagarService } from '../contas-pagar.service';
import { ContasPagarDTO } from '../model/contasPagarDTO';

import { EmpresaService } from '../../empresa/service/empresa-service';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';
import { ClassificacaoDespesaService } from '../../classificacao-despesa/classificacao-despesa.service';
import { ClassificacaoDespesa, SubClassificacaoDespesa } from '../../classificacao-despesa/classificacao-despesa';

@Component({
  selector: 'app-filtro-avancado',
  templateUrl: './filtro-avancado.component.html',
  styleUrls: ['./filtro-avancado.component.scss'],
})
export class FiltroAvancadoComponent implements OnInit {

  formasPgtoOptions!: any[];
  tipoDespesasOptions!: any[];
  situacaoOptions!: any[];

  pagina$!: Observable<ContasPagarPage>;

  formFilter!: FormGroup;

  formFilterAvancadissimo!: FormGroup;

  empresas!:   Empresa[];
  classificacaoDespesa!: ClassificacaoDespesa[];
  subclassificacaoDespesa!: SubClassificacaoDespesa[];

  disabledDataVencimento: boolean = false;
  disabledDataPagamento: boolean = false;

  constructor(
    private service: ContasPagarService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private classificacaoService: ClassificacaoDespesaService
  ) {
    this.subclassificacaoDespesa = []

    this.formFilterAvancadissimo = this.formBuilder.group({

      dataVencimentoInicial:[null],
      dataVencimentoFinal:[null],
      dataPagamentoInicial:[null],
      dataPagamentoFinal:[null],
      fornecedor:[null],
      nd:[null],
      localPagamento:[null],
      formaPagamento:[null],
      tipoDespesa:[null],
      situacao:[null],
      empresaId:[null],
      classificacaoDespesa:[null],
      subClassificacaoDespesa:[null],
          })

    this.formasPgtoOptions = [
      { label: 'ESPÉCIE', value: 'ESPÉCIE' },
      { label: 'BOLETO', value: 'BOLETO' },
      { label: 'CHEQUE', value: 'CHEQUE' },
      { label: 'TRANSFERÊNCIA', value: 'TRANSFERÊNCIA' },
      { label: 'DÉBITO', value: 'DÉBIRO' },
      { label: 'CRÉDITO', value: 'CRÉDITO' },
      { label: 'DEPÓSITO', value: 'DEPÓSITO' },
      { label: 'PEDIR_BOLETO', value: 'PEDIR_BOLETO' },
    ];
    this.tipoDespesasOptions = [
      { label: 'FIXA', value: 'FIXA' },
      { label: 'VARIÁVEL', value: 'VARIAVEL' },
    ];
    this.situacaoOptions = [
      { label: 'PAGO', value: 'PAGO' },
      { label: 'PENDENTE', value: 'PENDENTE' },
    ];
    this.empresaService.getAll().subscribe(
      (data : any) => {
        this.empresas = data;

      },
      (error: any) => {}
    );
    this.classificacaoService.getAllClassificacao().subscribe(
      (data: any) => {
        this.classificacaoDespesa = data;
      },
      (error: any) => {}
    );
  }

  ngOnInit(): void {}

  filtroAvancadissimo() {

    this.pagina$ = this.service.filtroAvancadoAvancado(this.formFilterAvancadissimo.value).pipe(
      tap((s: any) =>{
        this.spinner.hide();
        this.subclassificacaoDespesa = []
        console.log(s)
      }),
      catchError(erros => {
        this.spinner.hide();
        this.subclassificacaoDespesa = []
        return of([])
  })
    )

    this.service.setListaContasPagar(this.pagina$)
}
 carregarSubClassificacao(event: any) {
  let classificacao = this.classificacaoDespesa.filter(
    (x) => x.descricao === event.itemValue
  );
  this.subclassificacaoDespesa = classificacao[0].subClassificacao;
}
resetarFiltro(){
  this.formFilterAvancadissimo.reset()
  this.disabledDataVencimento= false;
  this.disabledDataPagamento = false;
}

 onDisabledDataVencimento(event: any){

  this.disabledDataVencimento = true;

 }
 onDisabledDataPagamento(event: any){
  this.disabledDataPagamento = true;

 }

 relatorioContabil() {
  this.spinner.show();
  this.pagina$ = this.service.relatorioContabil(this.formFilterAvancadissimo.value).pipe(
    tap(s =>{
      this.spinner.hide();
      this.subclassificacaoDespesa = []
    }),
    catchError(erros => {
      this.spinner.hide();
      this.subclassificacaoDespesa = []
      return of([])
})
  )


}

}

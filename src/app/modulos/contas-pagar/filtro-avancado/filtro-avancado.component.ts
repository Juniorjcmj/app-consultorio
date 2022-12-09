import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Observable, tap, catchError, of } from 'rxjs';
import { ContasPagarService } from '../contas-pagar.service';
import { ContasPagarDTO } from '../model/contasPagarDTO';
import { Filtro } from '../model/filtro';
import { EmpresaService } from '../../empresa/service/empresa-service';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';

@Component({
  selector: 'app-filtro-avancado',
  templateUrl: './filtro-avancado.component.html',
  styleUrls: ['./filtro-avancado.component.scss'],
})
export class FiltroAvancadoComponent implements OnInit {

  formasPgtoOptions!: any[];
  tipoDespesasOptions!: any[];
  situacaoOptions!: any[];

  filtro: Filtro = new Filtro();

  pagina$!: Observable<ContasPagarDTO[]>;

  formFilter!: FormGroup;

  empresas!:   Empresa[];

  constructor(
    private service: ContasPagarService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder
  ) {
    this.formFilter = this.formBuilder.group({

      dtInicio:[null, Validators.required],
      dtFim:[],
      classificacao:[null],
      subclassificacao:[null],
      situacao:[null],
      tipoDespesa:[null],
      numeroDocumento:[null],
      fornecedor:[null],
      idEmpresa: [null],
      formaPagamento:[null]

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
  }

  ngOnInit(): void {}

  filtroAvancado() {

        this.pagina$ = this.service.filtroAvancado(this.formFilter.value).pipe(
          tap(s =>{
            this.spinner.hide();
          }),
          catchError(erros => {
            this.spinner.hide();
            return of([])
      })
        )

        this.service.setListaContasPagar(this.pagina$)


  }
}

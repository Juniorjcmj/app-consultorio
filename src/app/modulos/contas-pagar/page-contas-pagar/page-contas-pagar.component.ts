import { CustomMensagensService } from './../../../services/mensagens.service';
import { EmpresaService } from './../../empresa/service/empresa-service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { catchError, of, tap, Observable, delay, map } from 'rxjs';
import { ContasPagarService } from '../contas-pagar.service';
import { ContasPagarDTO } from '../model/contasPagarDTO';
import { ContasPagarInput } from '../model/contasPagarInput';

import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';

import { format, compareAsc } from 'date-fns';

import { ClassificacaoDespesaService } from '../../classificacao-despesa/classificacao-despesa.service';

import {
  SubClassificacaoDespesa,
  ClassificacaoDespesa,
} from '../../classificacao-despesa/classificacao-despesa';
import { FiltroAvancado } from '../model/filtro';
import { ContasPagarPage } from './contasPagarPage';
import { AuthService } from '../../auth/auth.service';
import { CustomAsyncValidatorDirective } from 'src/app/shared/asyncValidator';
import { CustomLocalStorageService } from '../../../services/custom-local-storage.service';


@Component({
  selector: 'app-page-contas-pagar',
  templateUrl: './page-contas-pagar.component.html',
  styleUrls: ['./page-contas-pagar.component.scss'],
  providers: [MessageService, ConfirmationService, CustomMensagensService],
})


export class PageContasPagarComponent implements OnInit {
  filtro: FiltroAvancado = new FiltroAvancado();

  @ViewChild('htmlData') htmlData!: ElementRef;

  ContasPagarInputDialog!: boolean;

  ContasPagarInput!: ContasPagarInput;

  selectedContasPagar!: ContasPagarDTO[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  ContasPagarDtoXLS!: ContasPagarDTO[];

  formasPgtoOptions!: any[];
  tipoDespesasOptions!: any[];
  situacaoOptions!: any[];
  classificacaoDespesa!: any[];
  subclassificacaoDespesa!: SubClassificacaoDespesa[];

  form!: FormGroup;
  formDeteleLote!: FormGroup;
  formDeleteLOteDialog: boolean = false;

  display: boolean = false;

  displaySideBar: boolean = false;
  detalheContas: ContasPagarDTO[] = [];

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina$!: Observable<ContasPagarPage>;
  empresas!: Empresa[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //MONTAR ELEMENTOS PARA FILTRO

  editarDtPgtoDialog: boolean;
  editarDataPgtoform!: FormGroup;

  editarLocalPgtoDialog: boolean;
  editarLocalPgtoform!: FormGroup;

  editarJurosMultaDialog: boolean;
  editarJurosMultatoform!: FormGroup;

  editarDescontoDialog: boolean;
  editarDescontoform!: FormGroup;

  //STATISTICA
  valoresPagos!: any;
  valoresApagar!: any;



  constructor(
    private empresaService: EmpresaService,
    private service: ContasPagarService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private classificacaoService: ClassificacaoDespesaService,
    private customLocalStorageService: CustomLocalStorageService
  ) {
    this.ContasPagarDtoXLS = [];

    this.editarDtPgtoDialog = false;
    this.editarLocalPgtoDialog = false;
    this.editarJurosMultaDialog = false;
    this.editarDescontoDialog = false;

    this.pegandoPrimeiroEUltimoDiaDaSemana();
    this.listAtual();

    this.empresaService.getAll().subscribe(
      (data: any) => {
        this.empresas = data;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );
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

    this.classificacaoService.getAllClassificacao().subscribe(
      (data: any) => {
        this.classificacaoDespesa = data;

      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );

  }

  ngOnInit(): void {
    this.spinner.show();
  }

  listAtual(){
    this.service.getListaContasPagar().subscribe(
      (data) => {
      this.pagina$ = data;

    },
      (error:any)=>{
        this.authService.getRedirect401(error.status);
      }
    );
  }

  mostraClassificacao(event: any) {
    let classificacao = this.classificacaoDespesa.filter(
      (x) => x.descricao === event.value
    );
    this.subclassificacaoDespesa = classificacao[0].subClassificacao;

  }

  pegandoPrimeiroEUltimoDiaDaSemana() {
    var data = new Date();
    var primeiro = data.getDate() - data.getDay();

    let primeiroDia = new Date(data.setDate(primeiro));
    let ultimoDia = new Date(data.setDate(data.getDate() + 6));

    this.filtro.dataVencimentoInicial = format(primeiroDia, 'yyyy-MM-dd');
    this.filtro.dataVencimentoFinal = format(ultimoDia, 'yyyy-MM-dd');

    this.pagina$ = this.service.filtroAvancadoAvancado(this.filtro).pipe(
      tap((s) => {
        this.spinner.hide();
      }),
      catchError((erros) => {
        this.spinner.hide();
        return of([]);
      })
    );
    this.service.setListaContasPagar(this.pagina$);
  }
  openNew() {
      this.subclassificacaoDespesa = [];
      this.form = this.formBuilder.group({
        id:[],
        empresa_id: [null, Validators.required],
        valorDuplicata: [null, Validators.required],
        dataVencimento: [null, Validators.required],
        formaPagamento: [null, Validators.required],
        fornecedor: [null, Validators.required],
        nd: [''],
        tipoDespesa: ['', Validators.required],
        numeroParcelas: [null, Validators.required],
        classificacaoDespesa: [''],
        subClassificacaoDespesa: [null],
        observacao: [null],
      });


      this.submitted = false;
      this.ContasPagarInputDialog = true;
  }
  edit(contas: ContasPagarDTO) {
    this.subclassificacaoDespesa = [];
    this.form = this.formBuilder.group({
      id: [contas.id, Validators.required],
      empresa_id: [contas.empresaId, Validators.required],
      valorDuplicata: [contas.valorDuplicata, Validators.required],
      dataVencimento: [contas.dataVencimento, Validators.required],
      formaPagamento: [contas.formaPagamento, Validators.required],
      fornecedor: [contas.fornecedor, Validators.required],
      nd: [contas.nd],
      tipoDespesa: [contas.tipoDespesa, Validators.required],
      numeroParcelas: [contas.numeroParcelas, Validators.required],
      classificacaoDespesa: [contas.classificacaoDespesa],
      subClassificacaoDespesa: [
        contas.subClassificacaoDespesa
      ],
      observacao: [contas.observacao],

    });
    this.submitted = false;
    this.ContasPagarInputDialog = true;
  }

  delete(record: ContasPagarDTO) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.fornecedor + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.service
          .delete(record.id)
          .pipe(
            tap((s) => {
             this.customMessage.onMessage("Operação realizada com sucesso", "success");
             this.listAtual();
            }),
            catchError((erros) => {
              this.spinner.hide();
              this.customMessage.onMessage("Operação não realizada!", "error");
              this.listAtual();
              return of([]);
            })
          )
        },
    });
  }
  abrirDeleteEmLote() {
    this.formDeteleLote = this.formBuilder.group({
      numeroDocumento: [null, Validators.required]
    });

    this.submitted = false;
    this.formDeleteLOteDialog = true;
  }

  deleteEmLote() {
        this.spinner.show();
        this.service
          .deleteEmLote(this.formDeteleLote.value)
          .pipe(
            tap((s) => {
              this.spinner.hide();
              this.formDeleteLOteDialog = false;
              this.customMessage.onMessage("Operação realizada com sucesso", "success")
              this.listAtual();
            }),
            catchError((erros) => {
              this.spinner.hide();
              this.customMessage.onMessage("Operação não realizada!", "error")
              return of([]);
            })
          )

  }
  hideDialog() {
    this.ContasPagarInputDialog = false;
    this.display = false;
    this.submitted = false;
  }
  manterContaPagar() {
      this.spinner.show();
      this.ContasPagarInputDialog = false;
      this.display = false;
      this.submitted = true;

    this.pagina$= this.service.manterContasPagar(this.form.value).pipe(
        tap((s) => {
          this.spinner.hide();
          this.customMessage.onSuccessSmall();
          this.listAtual();
           }),
        catchError((erros) => {
          this.spinner.hide();
         this.customMessage.onMessage("Erro ao tentar cadastrar, tente novamente", "error")
         this.listAtual();
          return of([]);
        })
      );


  }
  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onReload() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  public exportPdf(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('contas.pdf');
    });
  }
  exportExcelContas() {

    this.pagina$.subscribe(
      (data: any) => {
        import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(data.content);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
          });
          this.saveAsExcelFile(excelBuffer, 'contas');
        });
      },
      (error: any) => {}
    );


  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  editarDataPagamento(conta: ContasPagarDTO) {
    this.editarDataPgtoform = this.formBuilder.group({
      id: [conta.id],
      dataPagamento: [conta.dataPagamento, Validators.required],
    });
    this.submitted = false;

    this.editarDtPgtoDialog = true;
  }
  manterDataPagamento() {
    this.spinner.show();
    this.editarDtPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.pagina$ =  this.service
      .manterDataPagamento(this.editarDataPgtoform.value)
      .pipe(
        tap((s) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação realizada com sucesso", "success")

        }),
        catchError((erros) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação não realizada!", "error")
          this.listAtual();
          return of([]);
        })
      )
     }
  editarLocalPagamento(conta: ContasPagarDTO) {
    this.editarLocalPgtoform = this.formBuilder.group({
      id: [conta.id],
      localPagamento: [conta.localPagamento, Validators.required],
    });
    this.submitted = false;
    this.editarLocalPgtoDialog = true;
  }
  manterLocalPgto() {
    this.spinner.show();
    this.editarLocalPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.pagina$ = this.service
      .manterLocalPgto(this.editarLocalPgtoform.value)
      .pipe(
        tap((s) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação realizada com sucesso", "success")
          this.listAtual();
          this.displaySideBar =false
        }),
        catchError((erros) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação realizada com sucesso", "success")
          this.listAtual();
          return of([]);
        })
      )
  }

  editarDesconto(conta: ContasPagarDTO) {
    this.editarDescontoform = this.formBuilder.group({
      id: [conta.id],
      desconto: [conta.desconto, Validators.required],
    });
    this.submitted = false;
    this.editarDescontoDialog = true;
  }
  manterDesconto() {
    this.spinner.show();
    this.editarDescontoDialog = false;
    this.display = false;
    this.submitted = true;
    this.pagina$ = this.service
      .manterDesconto(this.editarDescontoform.value)
      .pipe(
        tap((s) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação realizada com sucesso", "success");
          this.displaySideBar =false
        }),
        catchError((erros) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação não realizada!", "error")
          this.listAtual();
          return of([]);
        })
      )
  }

  editarJurosMulta(conta: ContasPagarDTO) {
    this.editarJurosMultatoform = this.formBuilder.group({
      id: [conta.id],
      jurosMulta: [conta.jurosMulta, Validators.required],
    });
    this.submitted = false;
    this.editarJurosMultaDialog = true;
  }
  manterJurosMulta() {
    this.spinner.show();
    this.editarJurosMultaDialog = false;
    this.display = false;
    this.submitted = true;
    this.pagina$ =  this.service
      .manterJurosMulta(this.editarJurosMultatoform.value)
      .pipe(
        tap((s) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação realizada com sucesso", "success");
          this.displaySideBar =false

        }),
        catchError((erros) => {
          this.spinner.hide();
          this.customMessage.onMessage("Operação não realizada ", "error");
          this.listAtual();
          return of([]);
        })
      )

  }
  detalhamentoSidebar(conta: ContasPagarDTO) {
    this.detalheContas = [];
    this.detalheContas.push(conta);
    this.displaySideBar = true;
  }

}

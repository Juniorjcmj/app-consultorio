import { EmpresaService } from './../../empresa/service/empresa-service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Filtro } from '../model/filtro';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';

import { format, compareAsc } from 'date-fns'

@Component({
  selector: 'app-page-contas-pagar',
  templateUrl: './page-contas-pagar.component.html',
  styleUrls: ['./page-contas-pagar.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageContasPagarComponent implements OnInit {

  filtro: Filtro = new Filtro();

  @ViewChild('htmlData') htmlData!: ElementRef;

  ContasPagarInputDialog!: boolean;

  ContasPagarInput!:   ContasPagarInput;

  selectedContasPagar!:   ContasPagarDTO[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  ContasPagarDtoXLS!:   ContasPagarDTO[];

  formasPgtoOptions!: any[];
  tipoDespesasOptions!: any[];
  situacaoOptions!: any[];

  form!: FormGroup;

  display: boolean = false;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina$!:  Observable<ContasPagarDTO[]>;
  empresas!:   Empresa[];

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

  constructor(
    private empresaService: EmpresaService,
    private service: ContasPagarService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private keycloakService: KeycloakService) {

    this.editarDtPgtoDialog = false;
    this.editarLocalPgtoDialog = false;
    this.editarJurosMultaDialog = false;
    this.editarDescontoDialog = false;

    this.pegandoPrimeiroEUltimoDiaDaSemana()
   this.service.getListaContasPagar().subscribe(
    data => {
      this.pagina$ = data;
    }
   );


    this.empresaService.getAll().subscribe(
      (data : any) => {
        this.empresas = data;

      },
      (error: any) => {}
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
    ]
   }

  ngOnInit(): void {
    this.spinner.show();
  }

  pegandoPrimeiroEUltimoDiaDaSemana(){
    console.log("chamando")
    var data = new Date();
   var primeiro = data.getDate() - data.getDay();

   let primeiroDia = new Date(data.setDate(primeiro));
   let ultimoDia = new Date(data.setDate(data.getDate()+6));

    this.filtro.dtInicio = format(primeiroDia, 'yyyy-MM-dd')
    this.filtro.dtFim = format(ultimoDia, 'yyyy-MM-dd')

    this.pagina$ = this.service.filtroAvancado(this.filtro) .pipe(
      tap(s =>{
        this.spinner.hide();
      }),
      catchError(erros => {
        this.spinner.hide();
        return of([])
  })
    )
    this.service.setListaContasPagar(this.pagina$);
  }

  openNew() {
    this.form = this.formBuilder.group({
      empresa_id: [null, Validators.required],
      valorDuplicata: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      formaPagamento: [null, Validators.required],
      fornecedor: [null, Validators.required],
      nd: [null, Validators.required],
      tipoDespesa: [null, Validators.required],
      numeroParcelas: [null, Validators.required],
      classificacaoDespesa:[null, Validators.required],
      subClassificacaoDespesa:[null, Validators.required],
      observacao:[null, Validators.required]
    });
    this.submitted = false;
    this.ContasPagarInputDialog = true;
  }
  edit(contas: ContasPagarDTO) {
    this.form = this.formBuilder.group({
      id: [contas.id, Validators.required],
      empresa_id: [contas.empresaId, Validators.required],
      valorDuplicata: [contas.valorDuplicata, Validators.required],
      dataVencimento: [contas.dataVencimento, Validators.required],
      formaPagamento: [contas.formaPagamento, Validators.required],
      fornecedor: [contas.fornecedor, Validators.required],
      nd: [contas.nd, Validators.required],
      tipoDespesa: [contas.tipoDespesa, Validators.required],
      numeroParcelas: [contas.numeroParcelas, Validators.required],
      classificacaoDespesa:[contas.classificacaoDespesa, Validators.required],
      subClassificacaoDespesa:[contas.subClassificacaoDespesa, Validators.required],
      observacao:[contas.observacao, Validators.required]
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
        this.service.delete(record.id).pipe(
          tap(s =>{
            this.spinner.hide();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Conta Excluida com Sucesso!',
              life: 2000,
            });
          }),
          catchError(erros => {
            this.spinner.hide();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error',
              life: 3000,
            });
            return of([])

          })
        ).subscribe(
          (data: any) => {
            this.spinner.hide();
            document.location.reload();
          }
        );
      },
    });
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

  this.pagina$ = this.service.manterContasPagar(this.form.value).pipe(
      tap(s =>{
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Conta Salva com Sucesso!',
          life: 2000,
        });
      }),
      catchError(erros => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
          life: 3000,
        });
        return of([])

      })
    )
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
      PDF.save('angular-demo.pdf');
    });
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.ContasPagarDtoXLS!);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
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

  editarDataPagamento(conta: ContasPagarDTO){
    this.editarDataPgtoform = this.formBuilder.group({
      id: [conta.id],
      dataPagamento: [conta.dataPagamento, Validators.required],

    });
    this.submitted = false;
    this.editarDtPgtoDialog = true;
  }
  manterDataPagamento(){

    this.spinner.show();
    this.editarDtPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDataPagamento(this.editarDataPgtoform.value).pipe(
      tap(s =>{
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Operação realizada com Sucesso!',
          life: 4000,
        });
        document.location.reload();
      }),
      catchError(erros => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
          life: 3000,
        });
        return of([])

      })
    ).subscribe(
      (data: any) => {
        this.pagina$ = data;
        this.spinner.hide();
        document.location.reload();
      }
    )

  }
  editarLocalPagamento(conta: ContasPagarDTO){
    this.editarLocalPgtoform = this.formBuilder.group({
      id: [conta.id],
      localPagamento: [conta.localPagamento, Validators.required],

    });
    this.submitted = false;
    this.editarLocalPgtoDialog = true;
  }
  manterLocalPgto(){

    this.spinner.show();
    this.editarLocalPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterLocalPgto(this.editarLocalPgtoform.value).pipe(
      tap(s =>{
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Operação realizada com Sucesso!',
          life: 4000,
        });
        document.location.reload();
      }),
      catchError(erros => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
          life: 3000,
        });
        return of([])

      })
    ).subscribe(
      (data: any) => {
        this.spinner.hide();
        document.location.reload();
      }
    )

  }

  editarDesconto(conta: ContasPagarDTO){
    this.editarDescontoform = this.formBuilder.group({
      id: [conta.id],
      desconto: [conta.desconto, Validators.required],

    });
    this.submitted = false;
    this.editarDescontoDialog = true;
  }
  manterDesconto(){

    this.spinner.show();
    this.editarDescontoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDesconto(this.editarDescontoform.value).pipe(
      tap(s =>{
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Operação realizada com Sucesso!',
          life: 4000,
        });
        document.location.reload();
      }),
      catchError(erros => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
          life: 3000,
        });
        return of([])

      })
    ).subscribe(
      (data: any) => {
        this.spinner.hide();
        document.location.reload();
      }
    )

  }

  editarJurosMulta(conta: ContasPagarDTO){
    this.editarJurosMultatoform = this.formBuilder.group({
      id: [conta.id],
      jurosMulta: [conta.jurosMulta, Validators.required],

    });
    this.submitted = false;
    this.editarJurosMultaDialog = true;
  }
  manterJurosMulta(){

    this.spinner.show();
    this.editarJurosMultaDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterJurosMulta(this.editarJurosMultatoform.value).pipe(
      tap(s =>{
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Operação realizada com Sucesso!',
          life: 4000,
        });
        document.location.reload();
      }),
      catchError(erros => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
          life: 3000,
        });
        return of([])

      })
    ).subscribe(
      (data: any) => {
        this.spinner.hide();
        document.location.reload();
      }
    )

  }




}

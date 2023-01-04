import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConciliacaoCartaoService } from '../service/conciliacao-service';
import {
  ConciliacaoCartao,
  PageConciliacao,
  Empresa,
  Operadora,
  ConciliacaoCartaoInput,
} from '../model/conciliacaoCartao';
import { ConfirmationService, MessageService } from 'primeng/api';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmpresaService } from '../../empresa/service/empresa-service';


import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';

import { OperadoraCartaoService } from '../../operadora-cartao/operadora-cartao.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ListComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  conciliacaoDialog!: boolean;

  conciliacao!: ConciliacaoCartao;

  selectedConciliacao!: ConciliacaoCartao[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  conciliacaoXLS!: ConciliacaoCartao[];

  empresas!: Empresa[];
  operadoras!: Operadora[];

  stateOptions!: any[];
  statusRecebimento!: any[];

  form!: FormGroup;
  formDataRecebimento!: FormGroup;

  display: boolean = false;

  page: number;

  pageConciliacao: PageConciliacao = new PageConciliacao();

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: ConciliacaoCartao[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //TRABALHANDO COM FILTROS
  queryFields = new FormControl();
  queryFieldsAute = new FormControl();
  queryFieldsData = new FormControl();
  queryFieldsIdEmpresa = new FormControl();

  formFilter!: FormGroup;


  constructor(
    private conciliacaoCartaoService: ConciliacaoCartaoService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private serviceOperadora: OperadoraCartaoService
  ) {

    this.page = this.pageConciliacao.number == undefined ? 0 : this.pageConciliacao.number;
    console.log(this.page)
    this.stateOptions = [
      { label: 'CRÉDITO', value: 'CRÉDITO' },
      { label: 'DÉBITO', value: 'DÉBITO' },
    ];
    this.statusRecebimento = [
      { label: 'RECEBIDO', value: 'true' },
      { label: 'NÃO RECEBIDO', value: 'false' },
    ];

    this.conciliacaoCartaoService.getAll(this.page).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data.content;

        this.conciliacaoXLS = this.pagina;
      },
      (error) => { }
    );
    this.serviceOperadora.getAllOperadoraPage(250,0).subscribe(
      (data) => {
        this.spinner.hide();
        this.operadoras = data.content;

      },
      (error) => {}
    );

    this.empresaService.getAll().subscribe(
      (data) => {
        this.empresas = data;
      },
      (error) => {}
    );

    this.formFilter = this.formBuilder.group({
      dtInicio:[null],
      dtFim:[],
      numeroPedido:[null],
      aute:[null],
      idEmpresa: [null],
      idOperadora:[null],
      dataRecebimento:[null],
      previsaoRecebimento: [null],
      tipoOperacao:[null],
      isRecebido:[null],


    })
  }

  ngOnInit(): void {
    this.spinner.show();

    this.queryFields.valueChanges
     .pipe(
      map(value => value.trim()), //remove todos os espaçoa
      filter(value => value.length > 3),//filtra somente com mais de 3 caracteres
      debounceTime(200),// espero 200 milissegundos para dar tempo de digitar
      distinctUntilChanged(),//só faz a busca se o valor for diferente do anterior
      switchMap(value => this.conciliacaoCartaoService.obterNumeroPedido(this.queryFields.value).subscribe((res:any) =>{this.pagina = res} ) ))

  }
  filtroAvancado(){
    this.spinner.show();
    this.conciliacaoCartaoService.filtroAvancado(this.formFilter.value, this.pageConciliacao.number).subscribe(
      (res:any)  =>{
      this.pageConciliacao = res;
      this.pagina = this.pageConciliacao.content
      this.spinner.hide();
    }
       );
  }
  onSearchNumeroPedido(){
    this.conciliacaoCartaoService.obterNumeroPedido(this.queryFields.value).subscribe((res:any)  =>{this.pagina = res} );
  }

  openNew() {

    this.form = this.formBuilder.group({
      id: [null],
      data: [null, Validators.required],
      idEmpresa: [null, Validators.required],
      idOperadora: [null, Validators.required],
      valorPedido: [null, Validators.required],
      numeroPedido: [null, Validators.required],
      aute: [null, Validators.required],
      tipoOperacao: [null, Validators.required],
      quemCadastrou:[this.authService.getUser()]
    });

    this.submitted = false;
    this.conciliacaoDialog = true;
  }
  fabricarExel(event: any) {
    console.log('emitindo exel');
  }
  deleteSelectedacompanhamentos() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o lançamento?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedConciliacao = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'exclusão realizada com sucesso',
          life: 3000,
        });
      },
    });
  }

  editConciliacao(conciliacao: ConciliacaoCartao) {
    this.form = this.formBuilder.group({
      id: [conciliacao.id],
      data: [conciliacao.data, Validators.required],
      idEmpresa: [conciliacao.idEmpresa, Validators.required],
      idOperadora: [conciliacao.idOperadora, Validators.required],
      valorPedido: [conciliacao.valorPedido, Validators.required],
      numeroPedido: [conciliacao.numeroPedido, Validators.required],
      aute: [conciliacao.aute, Validators.required],
      tipoOperacao: [conciliacao.tipoOperacao, Validators.required],
      dataRecebimento: [conciliacao.dataRecebimento],
      quemConferiu:[this.authService.getUser()]
    });

    //this.conciliacao = { ...conciliacao };
    this.conciliacaoDialog = true;
  }
  deleteConciliacao(record: ConciliacaoCartao) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.numeroPedido + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.conciliacaoCartaoService.delete(record.id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: ' Excluido com sucesso',
              life: 2000,
            });

            return this.buscarPorNumeroPagina(this.pageConciliacao.number);
          },
          (error) => {
            this.spinner.hide();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error',
              life: 3000,
            });
          }
        );
      },
    });
  }
  hideDialog() {
    this.conciliacaoDialog = false;
    this.display = false;
    this.submitted = false;
  }
  manterConciliacao() {
    this.spinner.show();
    this.conciliacaoDialog = false;
    this.display = false;
    this.submitted = true;
    this.conciliacaoCartaoService.manterConciliacao(this.form.value).subscribe(
      (success:any) => {
        //this.pagina = success;
        this.buscarPorNumeroPagina(this.pageConciliacao.number);
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Conciliação Salva',
          life: 2000,
        });
        setTimeout(() => {}, 6000);
       // return this.buscarPorNumeroPagina(1);
      },
      (error) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
          life: 3000,
        });

        return '';
      }
    );
  }
  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.acompanhamentos.length; i++) {
    //     if (this.acompanhamentos[i].id === id) {
    //         index = i;
    //         break;
    //     }
    // }

    return index;
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
      const worksheet = xlsx.utils.json_to_sheet(this.conciliacaoXLS!);
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

  //TRABALHANDO A PAGINAÇÃO DINAMICAMENTE

  buscarPorNumeroPagina(numeroPagina: number) {

    this.conciliacaoCartaoService.getAll(numeroPagina).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pageConciliacao = data;
        this.pagina = this.pageConciliacao.content;
        this.conciliacaoXLS = this.pagina;
      },
      (error) => {}
    );
  }

  next() {
    this.spinner.show();
    let valor = this.pageConciliacao.number + 1;
    return this.buscarPorNumeroPagina(valor);
  }

  prev() {
    this.spinner.show();
    let valor = this.pageConciliacao.number > 0 ? this.pageConciliacao.number -1 : 0 ;
    return this.buscarPorNumeroPagina(valor);
  }

  reset() {
    this.spinner.show();
    return this.buscarPorNumeroPagina(0);
  }

  isLastPage() {
    return true;
    //return !this.pagina.first;
  }

  isFirstPage(): boolean {
    return false;
   // return !this.pagina.last;
  }

  //trabalhando com ações na rows

  isConferido(conciliacaoInput: ConciliacaoCartao) {
    this.spinner.show();
    let valor = conciliacaoInput.foiConferido == 'SIM' ? false : true;
    this.conciliacaoCartaoService
      .alterarConferidoOuNao('foiConferido', valor, conciliacaoInput.id)
      .subscribe(
        (data: any) => {
          // this.pagina = data
          this.spinner.hide();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: ' Parabéns, bom trabalho! ',
            life: 4000,
          });
          return this.buscarPorNumeroPagina(this.page);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error',
            life: 4000,
          });
        }
      );
  }

  showDialog(conciliacao: ConciliacaoCartao) {
    this.formDataRecebimento = this.formBuilder.group({
      id: [conciliacao.id],
      data: [conciliacao.data],
      idEmpresa: [conciliacao.idEmpresa],
      idOperadora: [conciliacao.idOperadora],
      valorPedido: [conciliacao.valorPedido],
      numeroPedido: [conciliacao.numeroPedido],
      aute: [conciliacao.aute],
      tipoOperacao: [conciliacao.tipoOperacao],
      dataRecebimento: [conciliacao.dataRecebimento, Validators.required],
    });
    this.display = true;
  }

  manterDataRecebimentoConciliacao() {
    this.spinner.show();
    this.display = false;
    this.submitted = true;
    this.conciliacaoCartaoService
      .alterarDataRecebimento(this.formDataRecebimento.value)
      .subscribe(
        (success: any) => {
        //  this.pagina = success;
          this.spinner.hide();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'data cadastrada com sucesso!',
            life: 2000,
          });
          setTimeout(() => {}, 2000);
          return this.buscarPorNumeroPagina(this.pageConciliacao.number);
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error',
            life: 3000,
          });

          return '';
        }
      );
  }


}

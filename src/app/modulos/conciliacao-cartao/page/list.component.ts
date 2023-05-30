import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConciliacaoCartaoService } from '../service/conciliacao-service';
import {
  ConciliacaoCartao,
  PageConciliacao,
  Empresa,
  Operadora

} from '../model/conciliacaoCartao';
import { ConfirmationService, MessageService } from 'primeng/api';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';

import { EmpresaService } from '../../empresa/service/empresa-service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OperadoraCartaoService } from '../../operadora-cartao/operadora-cartao.service';
import { AuthService } from '../../auth/auth.service';

import { CustomMensagensService } from '../../../services/mensagens.service';
import { UpdateGenericoConciliacao } from '../model/updateGenericoConciliacao';


import * as XLSX from 'xlsx';
import format from 'date-fns/format';

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

 updateUtil: UpdateGenericoConciliacao = new UpdateGenericoConciliacao();

 //Gerar Excel
 title = 'conciliacão';
 fileName= 'conciliacao.xlsx';

  loading = false
  constructor(
    private conciliacaoCartaoService: ConciliacaoCartaoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,

    private empresaService: EmpresaService,
    private authService: AuthService,
    private serviceOperadora: OperadoraCartaoService,
    private customMessage: CustomMensagensService
  ) {

    this.formFilter = this.formBuilder.group({
      dtInicio:[''],
      dtFim:[''],
      numeroPedido:[''],
      aute:[''],
      idEmpresa: [''],
      idOperadora:[''],
      dataRecebimento:[''],
      previsaoRecebimento: [''],
      tipoOperacao:[''],
      isRecebido:[''],

    })
    this.stateOptions = [
      { label: 'CRÉDITO', value: 'CRÉDITO' },
      { label: 'DÉBITO', value: 'DÉBITO' },
    ];
    this.statusRecebimento = [
      { label: 'RECEBIDO', value: 'true' },
      { label: 'NÃO RECEBIDO', value: 'false' },
    ];

    this.onReload()

    this.serviceOperadora.getAllOperadoraPage(250,0).subscribe(
      (data) => {

        this.operadoras = data.content;
      },
      (error) => {
        this.authService.getRedirect401(error.status);
      }
    );

    this.empresaService.getAll().subscribe(
      (data) => {
        this.empresas = data;
      },
      (error) => {
        this.authService.getRedirect401(error.status);
      }
    );
  }

  ngOnInit(): void {
      this.loading = true;
  }

  filtroAvancado(){
    this.loading = true;
    this.conciliacaoCartaoService.filtroConciliacao(this.formFilter.value).subscribe(
      (data:any)  =>{
        this.loading = false;
      this.pageConciliacao = data;
      this.pagina = this.pageConciliacao.content

    }
       );
  }
  resetarFiltro(){
    this.formFilter.reset()
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

  editConciliacao(conciliacao: ConciliacaoCartao) {

    let dtFormatInput = new Date(conciliacao.data);
    let dtRecebimentoInput = new Date(conciliacao.data);

    this.form = this.formBuilder.group({
      id: [conciliacao.id],
      data: [format(dtFormatInput, 'yyyy-MM-dd'), Validators.required],
      idEmpresa: [conciliacao.idEmpresa, Validators.required],
      idOperadora: [conciliacao.idOperadora, Validators.required],
      valorPedido: [conciliacao.valorPedido, Validators.required],
      numeroPedido: [conciliacao.numeroPedido, Validators.required],
      aute: [conciliacao.aute, Validators.required],
      tipoOperacao: [conciliacao.tipoOperacao, Validators.required],
      dataRecebimento: [format(dtRecebimentoInput, 'yyyy-MM-dd')],
      quemConferiu:[this.authService.getUser()]
    });
    this.conciliacaoDialog = true;
  }

  deleteConciliacao(record: ConciliacaoCartao) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.numeroPedido + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.loading = true;
        this.conciliacaoCartaoService.delete(record.id).subscribe(
          (data) => {
            this.loading = false;
           this.customMessage.onMessage("Operação realizada com sucesso!","success")
          },
          (error) => {
            this.loading = false;
           this.customMessage.onMessage("Operação não realizada!","error")
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
    this.loading = true;
    this.conciliacaoDialog = false;
    this.display = false;
    this.submitted = true;
    this.conciliacaoCartaoService.manterConciliacao(this.form.value).subscribe(
      (success:any) => {
        this.loading = false;
        this.customMessage.onMessage("Operação realizada com sucesso!","success")
        this. onReload();
              },
      (error) => {
        this.loading = false;
       this.customMessage.onMessage("Operação não realizada!","error")

        return '';
      }
    );
  }

  onReload() {
    this.loading = true;
    this.conciliacaoCartaoService.filtroConciliacao(this.formFilter.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data.content;
        this.conciliacaoXLS = this.pagina;
      },
      (error:any) => {
        this.loading = false;
       this.authService.getRedirect401(error.status);
       }
    );
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
  // exportExcel() {
  //   import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.conciliacaoXLS!);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, {
  //       bookType: 'xlsx',
  //       type: 'array',
  //     });
  //     this.saveAsExcelFile(excelBuffer, 'products');
  //   });
  // }

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



  isConferido(conciliacaoInput: ConciliacaoCartao) {
    this.loading = true;
    this.updateUtil.foiConferido = conciliacaoInput.foiConferido == 'SIM' ? "false" : "true";
    this.updateUtil.id = conciliacaoInput.id.toString();
    this.updateUtil.quemConferiu = this.authService.getUser() as string;
    this.conciliacaoCartaoService
      .alterarConferidoOuNao(this.updateUtil)
      .subscribe(
        (data: any) => {
          // this.pagina = data
          this.loading = false;
          this.customMessage.onMessage("Operação realizada com sucesso!","success")
          this.pagina = data.content;
        },
        (error) => {
          this.loading = false;
          this.customMessage.onMessage("Operação não realizada!","error")
        }
      );
  }

  openDialogDataRecebimento(conciliacao: ConciliacaoCartao) {

    this.formDataRecebimento = this.formBuilder.group({
      id: [conciliacao.id],
      dataRecebimento: [conciliacao.dataRecebimento, Validators.required],
      foiConferido: [conciliacao.foiConferido],
      quemConferiu:[this.authService.getUser()]
    });
    this.display = true;
  }

  manterDataRecebimentoConciliacao() {
    this.loading = true;
    this.display = false;
    this.submitted = true;
    this.conciliacaoCartaoService
      .alterarDataRecebimento(this.formDataRecebimento.value)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.customMessage.onMessage("Operação realizada com sucesso!","success")
          this.pagina = data.content;
        },
        (error) => {
          this.loading = false;
        this.customMessage.onMessage("Operação não realizada!","error")

          return '';
        }
      );
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


}

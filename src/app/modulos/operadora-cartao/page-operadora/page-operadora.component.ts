import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OperadoraCartaoService } from '../operadora-cartao.service';
import { Operadora } from '../../conciliacao-cartao/model/conciliacaoCartao';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OperadoraPage } from './operadoraPage';
import { AuthService } from '../../auth/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-page-operadora',
  templateUrl: './page-operadora.component.html',
  styleUrls: ['./page-operadora.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageOperadoraComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  operadoraDialog!: boolean;

  operadora!: Operadora;

  selectedOperadora!: Operadora[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  operadoraXLS!: Operadora[];

  stateOptions!: any[];

  form!: FormGroup;
  formDataRecebimento!: FormGroup;

  display: boolean = false;

  formFilter!: FormGroup;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Operadora[];
  page!: OperadoraPage;

  @ViewChild('myDiv') myDiv!: ElementRef;

  queryFields = new FormControl();

  //gerar excel
  title = 'operadora';
  fileName= 'operadoras.xlsx';

  constructor(private service: OperadoraCartaoService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
    ) {

      this.service.getAllOperadoraPage(100, 0).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.page = data;
          this.pagina = this.page.content
          this.operadoraXLS = this.page.content;
        },
        (error) => {
          this.authService.getRedirect401(error.status);
        }
      );
      this.stateOptions = [
        { label: 'SIM', value: 'true' },
        { label: 'NÃO', value: 'false' },
      ];

      this.formFilter = this.formBuilder.group({
        nome:[null],
        bandeira:[null],
        dataInicio:[null],
        dataFim: [null],
      })
    }

  ngOnInit(): void {
    this.spinner.show();
  }
  filtroAvancado(){
    this.spinner.show();
    this.service.filtroAvancado(this.formFilter.value, this.page.number).subscribe(
      (res:any)  =>{
        this.page = res;
      this.pagina = this.page.content
      this.formFilter.reset();
      this.spinner.hide();
    }
       );
  }

  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      bandeira: [null, Validators.required],
      antecipacaoAutomatica: [null, Validators.required],
      diasParaRecebimento: [null, Validators.required],
      taxaAntecipacaoCredito: [null, Validators.required],
      taxaPadraoCredito: [null, Validators.required],
      taxaPadraoDebito:[null, Validators.required],
      inicio:[null, Validators.required],
      fim:[null]
    });
    this.submitted = false;
    this.operadoraDialog = true;
  }
  edit(operadora: Operadora) {
    this.form = this.formBuilder.group({
      id: [operadora.id],
      nome: [operadora.nome, Validators.required],
      bandeira: [operadora.bandeira, Validators.required],
      antecipacaoAutomatica: [operadora.antecipacaoAutomatica, Validators.required],
      diasParaRecebimento: [operadora.diasParaRecebimento, Validators.required],
      taxaAntecipacaoCredito: [operadora.taxaAntecipacaoCredito, Validators.required],
      taxaPadraoCredito: [operadora.taxaPadraoCredito, Validators.required],
      taxaPadraoDebito:[operadora.taxaPadraoDebito, Validators.required],
      inicio:[operadora.inicio, Validators.required],
      fim:[operadora.fim, Validators.required]
    });
    this.submitted = false;
    this.operadoraDialog = true;
  }
  clone(operadora: Operadora) {
    this.service.desativarOperadora(operadora.id).subscribe(
      (data: any) => {},
      (error) => { }
    );

    this.form = this.formBuilder.group({
      id: [null],
      nome: [operadora.nome, Validators.required],
      bandeira: [operadora.bandeira, Validators.required],
      antecipacaoAutomatica: [operadora.antecipacaoAutomatica, Validators.required],
      diasParaRecebimento: [operadora.diasParaRecebimento, Validators.required],
      taxaAntecipacaoCredito: [operadora.taxaAntecipacaoCredito, Validators.required],
      taxaPadraoCredito: [operadora.taxaPadraoCredito, Validators.required],
      taxaPadraoDebito:[operadora.taxaPadraoDebito, Validators.required],
      inicio:[operadora.inicio, Validators.required],
      fim:[operadora.fim, Validators.required]
    });
    this.submitted = false;
    this.operadoraDialog = true;
  }
  deleteOperadora(record: Operadora) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.nome + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.service.delete(record.id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: ' Excluido com sucesso',
              life: 2000,
            });
            return this.findAll();
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
  findAll(): void {
   this.service.getAllOperadoraPage(this.page.size , this.page.number).subscribe(
    (data: any)=>{
      this.page = data;
      this.pagina = this.page.content
      this.spinner.hide();
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
   )
  }
  hideDialog() {
    this.operadoraDialog = false;
    this.display = false;
    this.submitted = false;
  }
  getAllDesativadas(){
     this.service.getAllOperadoraDesativada(this.page.size,0).subscribe(
    (data: any) => {
      this.spinner.hide();
      this.page = data;
      this.pagina = this.page.content
      this.operadoraXLS = this.page.content;
    },
    (error) => { }
  );
  }

  manterOperadora() {

    this.spinner.show();
    this.operadoraDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manter(this.form.value).subscribe(
      (success:any) => {
        this.findAll()
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Operadora Salva',
          life: 2000,
        });
        setTimeout(() => {}, 6000);
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
//MÉTODOS AUXILIARES PARA PAGINAÇÃO
  nextPage(){
    this.service.getAllOperadoraPage(this.page.size, this.page.number + 1).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.page = data;
       this.pagina = this.page.content
       console.log(this.page)
        this.operadoraXLS = this.page.content;
      },
      (error) => { }
    );
  }
  previousPage(){
    this.spinner.show()
    console.log("chamando  página anterior")
    var number = this.page.number - 1
    this.service.getAllOperadoraPage(this.page.size, number).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.page = data;
        this.pagina = this.page.content
        this.operadoraXLS = this.page.content;
      },
      (error) => { }
    );
  }
  resetPage(){
    this.service.getAllOperadoraPage(this.page.size, 0).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.page = data;
       this.pagina = this.page.content
        this.operadoraXLS = this.page.content;
      },
      (error) => { }
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

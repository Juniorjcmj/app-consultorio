import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomMensagensService } from 'src/app/services/mensagens.service';

import * as XLSX from 'xlsx';
import { AuthService } from '../../auth/auth.service';
import { FuncaoService } from '../funcao.service';
import { Funcao } from '../model/funcao';

@Component({
  selector: 'app-page-funcao',
  templateUrl: './page-funcao.component.html',
  styleUrls: ['./page-funcao.component.scss'],
   providers: [MessageService, ConfirmationService],
})
export class PageFuncaoComponent implements OnInit {
   @ViewChild('htmlData') htmlData!: ElementRef;
  dialog!: boolean;

  funcao!: Funcao;

  selected!: Funcao[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  objXLS!: Funcao[];

  stateOptions!: any[];

  form!: FormGroup;

  display: boolean = false;

  formFilter!: FormGroup;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Funcao[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //gerar excel
  title = 'funcao';
  fileName= 'funcao.xlsx';

  constructor(
    private service: FuncaoService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {
    this.service.getAll().subscribe(
        (data: any) => {
          this.spinner.hide();
          this.pagina = data
          this.objXLS = data
        },
        (error) => {
          this.spinner.hide();
          this.authService.getRedirect401(error.status);
        }
      );
  }

  ngOnInit(): void {
    this.spinner.show();
  }
   openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required]

    });
    this.submitted = false;
    this.dialog = true;
  }
  edit(funcao: Funcao) {
    this.form = this.formBuilder.group({
      id: [funcao.id],
      descricao: [funcao.descricao, Validators.required]
    });
    this.submitted = false;
    this.dialog = true;
  }
   deleteColaborador(record: Funcao) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.descricao + '?',
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
    this.service.getAll().subscribe(
     (data: any)=>{
       this.pagina = data
       this.spinner.hide();
     },
     (error) => {
       this.spinner.hide();
       this.customMessage.onMessage("Erro ao excluir ", "error")
     }
    )
   }
   hideDialog() {
    this.dialog = false;
    this.display = false;
    this.submitted = false;
  }
  manterFuncao() {

    this.spinner.show();
    this.dialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manter(this.form.value).subscribe(
      (success:any) => {
        this.findAll()
        this.customMessage.onMessage("Operação realizada com sucesso! ", "success")
      },
      (error) => {
        this.spinner.hide();
        this.customMessage.onMessage("Erro ao tentar cadastrar! ", "error")

        return '';
      }
    );
  }
    findIndexById(id: string): number {
    let index = -1;


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
  }exportexcel(): void
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



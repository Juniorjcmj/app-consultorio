import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { AuthService } from '../../auth/auth.service';
import { Viatura } from '../model/viatura';
import { ViaturaService } from '../viatura.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-page-viatura',
  templateUrl: './page-viatura.component.html',
  styleUrls: ['./page-viatura.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageViaturaComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  viaturaDialog!: boolean;

  viatura!: Viatura;

  selectedViatura!: Viatura[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  viaturaXLS!: Viatura[];

  stateOptions!: any[];

  form!: FormGroup;

  display: boolean = false;

  formFilter!: FormGroup;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Viatura[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //gerar excel
  title = 'operadora';
  fileName= 'operadoras.xlsx';


  constructor(private service: ViaturaService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,

    private authService: AuthService) {

      this.service.getAll().subscribe(
        (data: any) => {

          this.pagina = data
          this.viaturaXLS = data
        },
        (error) => {

          this.authService.getRedirect401(error.status);
        }
      );
      this.stateOptions = [
        { label: 'EM OPERAÇÃO', value: 'EM OPERAÇÃO' },
        { label: 'EM MANUTENÇÃO', value: 'EM MANUTENÇÃO' },
      ];
     }

  ngOnInit(): void {

  }

  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      placa: [null, Validators.required],
      combustivel: [null, Validators.required],
      descricao: [null, Validators.required],
      status: [null, Validators.required],
    });
    this.submitted = false;
    this.viaturaDialog = true;
  }
  edit(viatura: Viatura) {
    this.form = this.formBuilder.group({
      id: [viatura.id],
      placa: [viatura.placa, Validators.required],
      combustivel: [viatura.combustivel, Validators.required],
      descricao: [viatura.descricao, Validators.required],
      status: [viatura.status, Validators.required],
    });
    this.submitted = false;
    this.viaturaDialog = true;
  }
  deleteOperadora(record: Viatura) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir

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

     },
     (error) => {

       this.customMessage.onMessage("Erro ao excluir ", "error")
     }
    )
   }
   hideDialog() {
    this.viaturaDialog = false;
    this.display = false;
    this.submitted = false;
  }
  manterOperadora() {


    this.viaturaDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manter(this.form.value).subscribe(
      (success:any) => {
        this.findAll()
        this.customMessage.onMessage("Operação realizada com sucesso! ", "success")
      },
      (error) => {

        this.customMessage.onMessage("Erro ao tentar cadastrar! ", "error")

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

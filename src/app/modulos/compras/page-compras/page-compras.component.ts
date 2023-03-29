import { Credito } from './../model/credito';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprasService } from '../compras.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth/auth.service';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-page-compras',
  templateUrl: './page-compras.component.html',
  styleUrls: ['./page-compras.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageComprasComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  creditoDialog!: boolean;

  credito!: Credito;

  selectedCredito!: Credito[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  creditoXLS!: Credito[];

  stateOptions!: any[];

  form!: FormGroup;
  formDataRecebimento!: FormGroup;

  display: boolean = false;
  pagina!: Credito[];

  constructor(private service: ComprasService,
    private messageService: MessageService,
    private customMessage: CustomMensagensService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService) {

    this.getAll();

    }

  ngOnInit(): void {
    this.spinner.show();
  }

  getAll(){
    this.service.getAll().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.creditoXLS = this.pagina;
      },
      (error) => {
        this.authService.getRedirect401(error.status);
      }
    );
  }

   openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      inicio: [null, Validators.required],
      credito: [null, Validators.required],

    });
    this.submitted = false;
    this.creditoDialog = true;
  }

  openEdit(credito: Credito) {
    this.form = this.formBuilder.group({
      id: [credito.id],
      inicio: [credito.inicio, Validators.required],
      credito: [credito.credito, Validators.required],

    });
    this.submitted = false;
    this.creditoDialog = true;
  }

  manterCredito() {

    this.spinner.show();
    this.creditoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manter(this.form.value).subscribe(
      (success:any) => {
        this.spinner.hide();
       this.customMessage.onSuccessSmall();
        setTimeout(() => {}, 6000);
        this.form.reset();

        this.getAll();
      },
      (error) => {
        this.spinner.hide();
        this.form.reset();
        this.customMessage.onMessage("Error ao cadastrar", "error")
      }
    );
  }
  delete(record: Credito) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.service.delete(record.id).subscribe(
          (data) => {
             this.customMessage.onMessage("Excluido com sucesso!!", "success")
             this.getAll();
          },
          (error) => {
            this.spinner.hide();
            this.customMessage.onMessage("Erro ao tentar excluir", "error")
          }
        );
      },
    });
  }
  hideDialog() {
    this.creditoDialog = false;
    this.display = false;
    this.submitted = false;
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
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.creditoXLS!);
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





}

import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { MessageService, ConfirmationService } from 'primeng/api';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';
import { EmpresaService } from '../service/empresa-service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-page-empresa',
  templateUrl: './page-empresa.component.html',
  styleUrls: ['./page-empresa.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageEmpresaComponent implements OnInit {
[x: string]: any;

  @ViewChild('htmlData') htmlData!: ElementRef;
  empresaDialog!: boolean;

  empresa!: Empresa;

  selectedEmpresa!: Empresa[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  empresaXLS!: Empresa[];

  stateOptions!: any[];

  form!: FormGroup;
  formDataRecebimento!: FormGroup;

  display: boolean = false;

  public loading = false;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Empresa[];


  constructor(private service: EmpresaService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private authService: AuthService) {



      this.service.getAll().subscribe(
        (data: any) => {

          this.pagina = data;
          this.empresaXLS = this.pagina;
          this.loading = false;
        },
        (error) => {
          this.authService.getRedirect401(error.status);
          this.loading = false;
        }
      );
     }

  ngOnInit(): void {
    this.loading = true;
  }
  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      endereco: [null, Validators.required],
      telFixo: [null, Validators.required],
      telMovel: [null, Validators.required],
      email: [null, Validators.required]
    });
    this.submitted = false;
    this.empresaDialog = true;
  }
  edit(empresa: Empresa) {

    this.form = this.formBuilder.group({
      id: [empresa.id],
      nome: [empresa.nome, Validators.required],
      cnpj: [empresa.cnpj, Validators.required],
      endereco: [empresa.endereco, Validators.required],
      telFixo: [empresa.telFixo, Validators.required],
      telMovel: [empresa.telMovel, Validators.required],
      email: [empresa.email, Validators.required]
    });
    this.submitted = false;
    this.empresaDialog = true;
  }
  manterEmpresa() {

    this.loading = true;
    this.empresaDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manter(this.form.value).subscribe(
      (success:any) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Empresa Salva',
          life: 2000,
        });
        setTimeout(() => {}, 6000);
        this.form.reset();
        this.findAll();
      },
      (error) => {
        this.loading = false;
        this.form.reset();
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

   delete(record: Empresa) {
    this.loading = true;
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.nome + '?',
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
            this.loading = false;
            return this.findAll();
          },
          (error) => {
            this.loading = false;
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
    this.loading = true;
    this.service.getAll().subscribe(
     (data: any)=>{
       this.pagina = data;
       this.loading = false;
     },
     (error) => {
      this.loading = false;
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
     this.empresaDialog = false;
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
      const worksheet = xlsx.utils.json_to_sheet(this.empresaXLS!);
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

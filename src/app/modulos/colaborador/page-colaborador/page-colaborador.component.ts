import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { AuthService } from '../../auth/auth.service';
import { ColaboradorService } from '../colaborador.service';
import { Colaborador } from '../model/colaborador';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-page-colaborador',
  templateUrl: './page-colaborador.component.html',
  styleUrls: ['./page-colaborador.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageColaboradorComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  dialog!: boolean;

  colaborador!: Colaborador;

  selected!: Colaborador[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  objXLS!: Colaborador[];

  stateOptions!: any[];

  form!: FormGroup;

  display: boolean = false;

  formFilter!: FormGroup;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Colaborador[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //gerar excel
  title = 'colaborador';
  fileName= 'colaborador.xlsx';


  constructor(
    private service: ColaboradorService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService) {


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

      this.stateOptions = [
        { label: 'ATIVO', value: 'true' },
        { label: 'INATIVO', value: 'false' },
      ];

    }

  ngOnInit(): void {
    this.spinner.show();
  }

  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      identidade: [null, Validators.required],
      funcao: [null, Validators.required],
      cnh: [null, Validators.required],
      tipoCnh: [null, Validators.required],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      ativo: [null, Validators.required],

    });
    this.submitted = false;
    this.dialog = true;
  }
  edit(colaborador: Colaborador) {
    this.form = this.formBuilder.group({
      id: [colaborador.id],
      nome: [colaborador.nome, Validators.required],
      identidade: [colaborador.identidade, Validators.required],
      funcao: [colaborador.funcao, Validators.required],
      cnh: [colaborador.cnh, Validators.required],
      tipoCnh: [colaborador.tipoCnh, Validators.required],
      cpf: [colaborador.cpf, Validators.required],
      dataNascimento: [colaborador.dataNascimento, Validators.required],
      ativo: [colaborador.ativo, Validators.required],
    });
    this.submitted = false;
    this.dialog = true;
  }

  deleteColaborador(record: Colaborador) {

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

  manterColaborador() {

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

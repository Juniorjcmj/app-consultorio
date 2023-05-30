import { Entrega } from './../model/entrega';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { AuthService } from '../../auth/auth.service';
import { Viatura } from '../../viatura/model/viatura';
import { ViaturaService } from '../../viatura/viatura.service';
import { Colaborador } from '../../colaborador/model/colaborador';
import { ColaboradorService } from '../../colaborador/colaborador.service';

import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import { EntregaService } from '../entrega.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-page-entrega',
  templateUrl: './page-entrega.component.html',
  styleUrls: ['./page-entrega.component.scss'],
   providers: [MessageService, ConfirmationService],
})
export class PageEntregaComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  dialog!: boolean;

  entrega!: Entrega;

  selected!: Entrega[];

  viaturas!: Viatura[];
  colaboradores!: Colaborador[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  entregaXLS!: Entrega[];

  status!: any[];

  form!: FormGroup;

  display: boolean = false;

  formdataChegadaDialog: boolean = false;

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Entrega[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //gerar excel
  title = 'entrega';
  fileName= 'entregas.xlsx';


  //PROPRIEDADES PARA COMPOR FILTRO
  viaturaOptions!: any[];
  colaboradorOptions!: any[];
  formFilter!: FormGroup;

  constructor(
    private viaturaService: ViaturaService,
    private colaboradorService: ColaboradorService,
    private service: EntregaService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,

    private authService: AuthService) {

      this.service.getAll().subscribe(
        (data: any) => {

          this.pagina = data
          this.entregaXLS = data
        },
        (error) => {

          this.authService.getRedirect401(error.status);
        }
      );
      this.viaturaService.getAll().subscribe(
        (data: any) => {
          this.viaturas = data
        },
        (error) => {
          this.authService.getRedirect401(error.status);
        }
      );
      this.colaboradorService.getAll().subscribe(
        (data: any) => {
          this.colaboradores = data;
        },
        (error) => {
          this.authService.getRedirect401(error.status);
        }
      );
      this.status = [
        { label: 'AGUARDANDO', value: 'AGUARDANDO' },
        { label: 'CARREGANDO', value: 'CARREGANDO' },
        { label: 'ENTREGUE', value: 'ENTREGUE' },
        { label: 'SAIU PARA ENTREGA', value: 'SAIU PARA ENTREGA' },
        { label: 'ADIADA', value: 'ADIADA' },
        { label: 'ENTREGA PARCIAL', value: 'ENTREGA PARCIAL' },
        { label: 'CANCELADA', value: 'CANCELADA' },
      ];

      this.formFilter = this.formBuilder.group({
        dataSaidaInicial: null,
        dataSaidaFinal: null,
        idViatura: null,
        idColaboradorMotorista: null,
        idColaboradorResponsavel: null,
        numeroPedido: null,

      })
     }

  ngOnInit(): void {

  }
  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      dataSaida: [null,Validators.required],
      horaSaida: [null, Validators.required],
      horaRetorno: [null],
      numeroPedido: [null,Validators.required ],
      idViatura: [null, Validators.required],
      odometroSaida: [null, Validators.required],
      odometroEntrada: [null],
      status: [null, Validators.required],
      idColaboradorMotorista: [null, Validators.required],
      idColaboradorResponsavel: [null, Validators.required],
      descricao: [null],
    });
    this.submitted = false;
    this.dialog = true;
  }

  edit(entrega: Entrega) {
    let dtSaidaInput = new Date(entrega.dataSaida);

    this.form = this.formBuilder.group({
      id: [entrega.id],
      dataSaida: [format(dtSaidaInput, 'yyyy-MM-dd'), Validators.required],
      horaRetorno: [entrega.horaRetorno],
      horaSaida: [entrega.horaSaida, Validators.required],
      status: [entrega.status, Validators.required],
      odometroSaida: [entrega.odometroSaida, Validators.required],
      odometroEntrada: [entrega.odometroEntrada],
      numeroPedido: [entrega.numeroPedido, Validators.required],
      descricao: [entrega.descricao],
      idViatura: [entrega.viatura.id, Validators.required],
      idColaboradorMotorista: [entrega.motorista.id, Validators.required],
      idColaboradorResponsavel: [entrega.responsavel.id, Validators.required],
    });
    this.submitted = false;
    this.dialog = true;
  }

  editChegada(entrega: Entrega) {
    this.form = this.formBuilder.group({
      id: [entrega.id],
      dataSaida: [entrega.dataSaida],
      horaRetorno: [entrega.horaRetorno, Validators.required],
      horaSaida: [entrega.horaSaida],
      status: [entrega.status],
      odometroSaida: [entrega.odometroSaida],
      odometroEntrada: [entrega.odometroEntrada],
      numeroPedido: [entrega.numeroPedido],
      descricao: [entrega.descricao],
      idViatura: [entrega.viatura.id],
      idColaboradorMotorista: [entrega.motorista.id],
      idColaboradorResponsavel: [entrega.responsavel.id],
    });
    this.submitted = false;
    this.formdataChegadaDialog = true;
  }


  delete(record: Entrega) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.numeroPedido + '?',
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

       this.customMessage.onMessage("Erro ", "error")
     }
    )
   }
   hideDialog() {
    this.dialog = false;
    this.display = false;
    this.submitted = false;
  }
  manter() {

    this.dialog = false;
    this.display = false;
    this.formdataChegadaDialog = false;
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


  //MÉTODOS PARA FILTRO AVANÇADO

  resetarFiltro(){
    this.formFilter.reset()
  }
  filtroAvancadissimo() {

   this.service.filtroAvancadoAvancado(this.formFilter.value).subscribe(
    (data : Entrega[]) =>{

          this.pagina = data
          this.entregaXLS = data
    }, (error: any)=>{

     this.customMessage.onMessage("Erro ao realizar pesquisa!", "error")
    }
  );
}


}

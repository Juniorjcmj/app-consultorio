import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ClassificacaoDespesa, SubClassificacaoDespesa } from '../classificacao-despesa';
import { ClassificacaoDespesaService } from '../classificacao-despesa.service';

@Component({
  selector: 'app-page-classificacao-despesa',
  templateUrl: './page-classificacao-despesa.component.html',
  styleUrls: ['./page-classificacao-despesa.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageClassificacaoDespesaComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  classificacaoDialog!: boolean;
  subclassificacaoDialog!: boolean;

  classificacao!: ClassificacaoDespesa;

  selectedClassificacao!: ClassificacaoDespesa[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  classificacaoXLS!: ClassificacaoDespesa[];

  stateOptions!: any[];

  form!: FormGroup;
  formSubclassificacao!: FormGroup;


  display: boolean = false;

  displaySub: boolean = false;
  listaSubClassificacao: SubClassificacaoDespesa[] = [];
  idClassificacao: string = "";

  pagina!: ClassificacaoDespesa[];


  constructor( private service: ClassificacaoDespesaService,  private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private keycloakService: KeycloakService) {

      this.service.getAllClassificacao().subscribe(
        (data: any) => {
          this.spinner.hide();
          this.pagina = data;
          this.classificacaoXLS = this.pagina;
        },
        (error) => { }
      );

    }

  ngOnInit(): void {
    this.spinner.show();
  }

  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
    });
    this.submitted = false;
    this.classificacaoDialog = true;
  }
  edit(classificacao: ClassificacaoDespesa) {

    this.form = this.formBuilder.group({
      id: [classificacao.id],
      descricao: [classificacao.descricao, Validators.required],
    });
    this.submitted = false;
    this.classificacaoDialog = true;
  }
  manterClassificacao() {

    this.spinner.show();
    this.classificacaoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterClassificacao(this.form.value).subscribe(
      (success:any) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Classificacão Salva',
          life: 2000,
        });
        setTimeout(() => {}, 6000);
        this.form.reset();
        this.findAll();
      },
      (error) => {
        this.spinner.hide();
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

   delete(record: ClassificacaoDespesa) {
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
    this.service.getAllClassificacao().subscribe(
     (data: any)=>{
       this.pagina = data;
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
     this.classificacaoDialog = false;
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
      const worksheet = xlsx.utils.json_to_sheet(this.classificacaoXLS!);
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

  exibirSubClassificacoes(classificacao: ClassificacaoDespesa){
    this.displaySub= true;
    this.idClassificacao = classificacao.id;
    this.listaSubClassificacao = classificacao.subClassificacao;
  }
  adicionarSubClassificacao() {

    this.formSubclassificacao = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required],
    });
    this.submitted = false;
    this.subclassificacaoDialog = true;
  }
  editSubClassificacao(record: SubClassificacaoDespesa) {

    this.formSubclassificacao = this.formBuilder.group({
      id: [record.id],
      descricao: [record.descricao, Validators.required],
    });
    this.submitted = false;
    this.subclassificacaoDialog = true;
  }
  manterSubclassificacao(){

    this.spinner.show();
    this.classificacaoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterSub(this.idClassificacao, this.formSubclassificacao.value).subscribe(
      (success:any) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'SubClassificacão Salva',
          life: 2000,
        });
        setTimeout(() => {}, 6000);
        this.formSubclassificacao.reset();
        this.findAll();
      },
      (error) => {
        this.spinner.hide();
        this.formSubclassificacao.reset();
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

  deleteSub(record: SubClassificacaoDespesa) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.service.deleteSub(this.idClassificacao,record.descricao).subscribe(
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

}

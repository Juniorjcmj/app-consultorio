import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConciliacaoCartaoService } from '../service/conciliacao-service';
import { Observable } from 'rxjs';
import { ConciliacaoCartao, PageConciliacao } from '../model/conciliacaoCartao';
import { ConfirmationService, MessageService } from 'primeng/api';


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService,ConfirmationService]
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

 // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
 pagina!: PageConciliacao;

  constructor(private conciliacaoCartaoService: ConciliacaoCartaoService, private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.conciliacaoCartaoService.getAll().subscribe(
      data => {
           this.pagina = data;
           this.conciliacaoXLS = this.pagina.content;
      },
      error => {

      }
    )
   }

  ngOnInit(): void {
  }

  openNew() {

    this.conciliacao = new ConciliacaoCartao();
    this.submitted = false;
    this.conciliacaoDialog = true;
}
fabricarExel(event: any){
  console.log("emitindo exel");
}
deleteSelectedacompanhamentos() {

  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected acompanhamentos?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //this.acompanhamentos$ = this.acompanhamentos$.filter(val => !this.selectedAcompanhamento.includes(val));
          this.selectedConciliacao = [];
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'acompanhamentos Deleted', life: 3000});
      }
  });
}

editacompanhamento(conciliacao: ConciliacaoCartao) {

  this.conciliacao = {...conciliacao};
  this.conciliacaoDialog = true;
}
deleteacompanhamento(record: ConciliacaoCartao) {
  this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.numeroPedido + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.conciliacaoCartaoService.delete(record.id).subscribe(
          data => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'acompanhamento Excluido', life: 2000});
            setTimeout(() => {
             // this.obterAcompanhamentos()
            }, 2000);
          },
          error => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error', life: 3000});
          }
        )

      }
  });
}
hideDialog() {
  this.conciliacaoDialog = false;
  this.submitted = false;
}
saveacompanhamento() {
  this.conciliacaoDialog = false;
  this.submitted = true;

  this.conciliacaoCartaoService.manterAcompanhamento(this.conciliacao).subscribe
  (
   success =>{
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'acompanhamento Salvo', life: 2000});
    setTimeout(() => {
     // this.obterAcompanhamentos()
    }, 2000);


   },
      error => {

       this.messageService.add({severity:'error', summary: 'Error', detail: 'Error', life: 3000});
      return '';
}
  )
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
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}


onReload(){
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
 import("xlsx").then(xlsx => {
     const worksheet = xlsx.utils.json_to_sheet(this.conciliacaoXLS!);
     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
     this.saveAsExcelFile(excelBuffer, "products");
 });
}

saveAsExcelFile(buffer: any, fileName: string): void {
 let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
 let EXCEL_EXTENSION = '.xlsx';
 const data: Blob = new Blob([buffer], {
     type: EXCEL_TYPE
 });
 FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassificacaoDespesa, SubClassificacaoDespesa } from '../../classificacao-despesa/classificacao-despesa';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { ClassificacaoDespesaService } from '../../classificacao-despesa/classificacao-despesa.service';
import { ContasPagarService } from '../../contas-pagar/contas-pagar.service';
import { EmpresaService } from '../../empresa/service/empresa-service';
import { ContasPagarPage } from '../../contas-pagar/page-contas-pagar/contasPagarPage';

@Component({
  selector: 'app-compras-relatorio',
  templateUrl: './compras-relatorio.component.html',
  styleUrls: ['./compras-relatorio.component.scss'],
  providers: [MessageService, ConfirmationService, CustomMensagensService],
})
export class ComprasRelatorioComponent implements OnInit {
  formasPgtoOptions!: any[];
  tipoDespesasOptions!: any[];
  situacaoOptions!: any[];

  formFilter!: FormGroup;

  formFilterAvancadissimo!: FormGroup;

  empresas!:   Empresa[];
  classificacaoDespesa!: ClassificacaoDespesa[];
  subclassificacaoDespesa!: SubClassificacaoDespesa[];

  disabledDataVencimento: boolean = false;
  disabledDataPagamento: boolean = false;

  constructor( private service: ContasPagarService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private classificacaoService: ClassificacaoDespesaService,
    private customMessage: CustomMensagensService) {

      this.subclassificacaoDespesa = []

    this.formFilterAvancadissimo = this.formBuilder.group({

      dataVencimentoInicial:[null],
      dataVencimentoFinal:[null],
      dataPagamentoInicial:[null],
      dataPagamentoFinal:[null],
      fornecedor:[null],
      nd:[null],
      localPagamento:[null],
      formaPagamento:[null],
      tipoDespesa:["VARIAVEL"],
      situacao:[null],
      empresaId:[null],
      classificacaoDespesa:[null],
      subClassificacaoDespesa:[null],
          })

    this.formasPgtoOptions = [
      { label: 'ESPÉCIE', value: 'ESPÉCIE' },
      { label: 'BOLETO', value: 'BOLETO' },
      { label: 'CHEQUE', value: 'CHEQUE' },
      { label: 'TRANSFERÊNCIA', value: 'TRANSFERÊNCIA' },
      { label: 'DÉBITO', value: 'DÉBIRO' },
      { label: 'CRÉDITO', value: 'CRÉDITO' },
      { label: 'DEPÓSITO', value: 'DEPÓSITO' },
      { label: 'PEDIR_BOLETO', value: 'PEDIR_BOLETO' },
    ];
    this.tipoDespesasOptions = [
      { label: 'FIXA', value: 'FIXA' },
      { label: 'VARIÁVEL', value: 'VARIAVEL' },
    ];
    this.situacaoOptions = [
      { label: 'PAGO', value: 'PAGO' },
      { label: 'PENDENTE', value: 'PENDENTE' },
    ];
    this.empresaService.getAll().subscribe(
      (data : any) => {
        this.empresas = data;

      },
      (error: any) => {}
    );
    this.classificacaoService.getAllClassificacao().subscribe(
      (data: any) => {
        this.classificacaoDespesa = data;
      },
      (error: any) => {}
    );
     }

  ngOnInit(): void {
  }
  filtroAvancadissimo() {
    this.spinner.show();
   this.service.filtroAvancadoAvancado(this.formFilterAvancadissimo.value).subscribe(
    (data : ContasPagarPage) =>{
      this.spinner.hide();
      this.service.setListaContasPagar(data)
      this.subclassificacaoDespesa = []
    }, (error: any)=>{
     this.customMessage.onMessage("Erro ao realizar pesquisa!", "error")
    }
  );
}
emitirRelatorio() {
  this.spinner.show();
  this.service.relatorioContabil(this.formFilterAvancadissimo.value).subscribe(
    (data : Blob) =>{

      this.spinner.hide();
      this.subclassificacaoDespesa = []



    }, (error: any)=>{
    this.customMessage.onMessage("Preencheu os filtros corretamente?", "error")
    this.spinner.hide();
    }
);
}
 carregarSubClassificacao(event: any) {
  let classificacao = this.classificacaoDespesa.filter(
    (x) => x.descricao === event.itemValue
  );
  this.subclassificacaoDespesa = classificacao[0].subClassificacao;
}
resetarFiltro(){
  this.formFilterAvancadissimo.reset()
  this.disabledDataVencimento= false;
  this.disabledDataPagamento = false;
}

 onDisabledDataVencimento(event: any){

  this.disabledDataVencimento = true;

 }
 onDisabledDataPagamento(event: any){
  this.disabledDataPagamento = true;

 }

 public downloadXls(): void {
  this.spinner.show();
  this.service.getUserXls(this.formFilterAvancadissimo.value).subscribe(
    (response: any) => {
      this.spinner.hide();
      const filename = this.getFilenameFromContentDisposition(response.headers.get('Content-Disposition'), "contabil");
      this.downloadFile(response.body, filename);
    },
    (error: any) => {
      this.customMessage.onMessage("Preencheu os filtros corretamente?", "error")
      this.spinner.hide();

    }

  );

}
public getContasAgrupasdasFornecedorXls(): void {
  this.spinner.show();
  this.service.getContasAgrupasdasFornecedorXls(this.formFilterAvancadissimo.value).subscribe(
    (response: any) => {
      this.spinner.hide();
      const filename = this.getFilenameFromContentDisposition(response.headers.get('Content-Disposition'), "contas-agrupadas");
      this.downloadFile(response.body, filename);
    },
    (error: any) => {
      this.customMessage.onMessage("Preencheu os filtros corretamente?", "error")
      this.spinner.hide();
    }
  );

}
private downloadFile(data: Blob, filename: string): void {
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}

private getFilenameFromContentDisposition(contentDisposition: string, nome: string): string {
  const filenameRegex = /filename[^;=\n]*=(['"]?)([^"';\n]*)\1?/;
  const matches = filenameRegex.exec(contentDisposition);
  return matches != null && matches.length > 2 ? matches[2] : nome+'.xls';
}




}

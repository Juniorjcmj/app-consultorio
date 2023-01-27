import { CustomMensagensService } from './../../../services/mensagens.service';
import { EmpresaService } from './../../empresa/service/empresa-service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { catchError, of, tap, Observable, delay, map } from 'rxjs';
import { ContasPagarService } from '../contas-pagar.service';
import { ContasPagarDTO } from '../model/contasPagarDTO';
import { ContasPagarInput } from '../model/contasPagarInput';

import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';

import { format, compareAsc } from 'date-fns';

import { ClassificacaoDespesaService } from '../../classificacao-despesa/classificacao-despesa.service';

import {
  SubClassificacaoDespesa,
  ClassificacaoDespesa,
} from '../../classificacao-despesa/classificacao-despesa';
import { FiltroAvancado } from '../model/filtro';
import { ContasPagarPage } from './contasPagarPage';
import { AuthService } from '../../auth/auth.service';
import { CustomAsyncValidatorDirective } from 'src/app/shared/asyncValidator';
import { CustomLocalStorageService } from '../../../services/custom-local-storage.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-page-contas-pagar',
  templateUrl: './page-contas-pagar.component.html',
  styleUrls: ['./page-contas-pagar.component.scss'],
  providers: [MessageService, ConfirmationService, CustomMensagensService],
})
export class PageContasPagarComponent implements OnInit {
  filtro: FiltroAvancado = new FiltroAvancado();

  @ViewChild('htmlData') htmlData!: ElementRef;

  ContasPagarInputDialog!: boolean;

  ContasPagarInput!: ContasPagarInput;

  selectedContasPagar!: ContasPagarDTO[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  ContasPagarDtoXLS!: ContasPagarDTO[];

  formasPgtoOptions!: any[];
  tipoDespesasOptions!: any[];
  situacaoOptions!: any[];
  classificacaoDespesa!: any[];
  subclassificacaoDespesa!: SubClassificacaoDespesa[];

  form!: FormGroup;
  formDeteleLote!: FormGroup;
  formDeleteLOteDialog: boolean = false;

  display: boolean = false;

  displaySideBar: boolean = false;
  detalheContas: ContasPagarDTO[] = [];

  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: ContasPagarPage;
  empresas!: Empresa[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //MONTAR ELEMENTOS PARA FILTRO

  editarDtPgtoDialog: boolean;
  editarDataPgtoform!: FormGroup;

  editarLocalPgtoDialog: boolean;
  editarLocalPgtoform!: FormGroup;

  editarJurosMultaDialog: boolean;
  editarJurosMultatoform!: FormGroup;

  editarDescontoDialog: boolean;
  editarDescontoform!: FormGroup;

  editarValorDuplicataDialog: boolean = false;
  editarValorDuplicataform!: FormGroup;

  //STATISTICA
  valoresPagos!: any;
  valoresApagar!: any;

  //Relatório excel
  title = 'Relatorio';
  fileName = 'relatorio.xlsx';

  constructor(
    private empresaService: EmpresaService,
    private service: ContasPagarService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private classificacaoService: ClassificacaoDespesaService,
    private customLocalStorageService: CustomLocalStorageService
  ) {
    this.ContasPagarDtoXLS = [];

    this.editarDtPgtoDialog = false;
    this.editarLocalPgtoDialog = false;
    this.editarJurosMultaDialog = false;
    this.editarDescontoDialog = false;

    this.pegandoPrimeiroEUltimoDiaDaSemana();
    this.listAtual();

    this.empresaService.getAll().subscribe(
      (data: any) => {
        this.empresas = data;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );
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

    this.classificacaoService.getAllClassificacao().subscribe(
      (data: any) => {
        this.classificacaoDespesa = data;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  listAtual() {
    this.spinner.show();
    this.service.getListaContasPagar().subscribe(
      (data) => {
        this.spinner.hide();
        this.pagina = data;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );
  }
  buscarComFiltroAtual() {
    const filtro = this.customLocalStorageService.get('filtro');
    this.service.filtroAvancadoAvancado(filtro).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.subclassificacaoDespesa = [];
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );
    this.service.setListaContasPagar(this.pagina);
  }

  mostraClassificacao(event: any) {
    let classificacao = this.classificacaoDespesa.filter(
      (x) => x.descricao === event.value
    );
    this.subclassificacaoDespesa = classificacao[0].subClassificacao;
  }

  pegandoPrimeiroEUltimoDiaDaSemana() {
    var data = new Date();
    var primeiro = data.getDate() - data.getDay();

    let primeiroDia = new Date(data.setDate(primeiro));
    let ultimoDia = new Date(data.setDate(data.getDate() + 6));

    this.filtro.dataVencimentoInicial = format(primeiroDia, 'yyyy-MM-dd');
    this.filtro.dataVencimentoFinal = format(ultimoDia, 'yyyy-MM-dd');

    this.service.filtroAvancadoAvancado(this.filtro).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.subclassificacaoDespesa = [];
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
      }
    );
    this.service.setListaContasPagar(this.pagina);
  }
  openNew() {
    this.subclassificacaoDespesa = [];
    this.form = this.formBuilder.group({
      id: [],
      empresa_id: [null, Validators.required],
      valorDuplicata: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      formaPagamento: [null, Validators.required],
      fornecedor: [null, Validators.required],
      nd: [''],
      tipoDespesa: ['', Validators.required],
      numeroParcelas: [null, Validators.required],
      classificacaoDespesa: [''],
      subClassificacaoDespesa: [null],
      observacao: [null],
    });

    this.submitted = false;
    this.ContasPagarInputDialog = true;
  }
  edit(contas: ContasPagarDTO) {
    this.subclassificacaoDespesa = [];
    this.form = this.formBuilder.group({
      id: [contas.id, Validators.required],
      empresa_id: [contas.empresaId, Validators.required],
      valorDuplicata: [contas.valorDuplicata, Validators.required],
      dataVencimento: [contas.dataVencimento, Validators.required],
      formaPagamento: [contas.formaPagamento, Validators.required],
      fornecedor: [contas.fornecedor, Validators.required],
      nd: [contas.nd],
      tipoDespesa: [contas.tipoDespesa, Validators.required],
      numeroParcelas: [contas.numeroParcelas, Validators.required],
      classificacaoDespesa: [contas.classificacaoDespesa],
      subClassificacaoDespesa: [contas.subClassificacaoDespesa],
      observacao: [contas.observacao],
    });
    this.submitted = false;
    this.ContasPagarInputDialog = true;
  }

  delete(record: ContasPagarDTO) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.fornecedor + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.service.delete(record.id).subscribe(
          (data) => {
            this.spinner.hide();
            this.customMessage.onMessage(
              'Operação realizada com sucesso!',
              'success'
            );
            this.buscarComFiltroAtual();
          },
          (error) => {
            this.spinner.hide();
            this.customMessage.onMessage('Operação não realizada!', 'error');
          }
        );
      },
    });
  }
  abrirDeleteEmLote() {
    this.formDeteleLote = this.formBuilder.group({
      numeroDocumento: [null, Validators.required],
    });

    this.submitted = false;
    this.formDeleteLOteDialog = true;
  }

  deleteEmLote() {
    this.spinner.show();
    this.service.deleteEmLote(this.formDeteleLote.value).subscribe(
      (data) => {
        this.spinner.hide();
        this.formDeleteLOteDialog = false;
        this.customMessage.onMessage(
          'Operação realizada com sucesso!',
          'success'
        );
        this.buscarComFiltroAtual();
      },
      (error) => {
        this.spinner.hide();
        this.customMessage.onMessage('Operação não realizada!', 'error');
      }
    );
  }
  hideDialog() {
    this.ContasPagarInputDialog = false;
    this.display = false;
    this.submitted = false;
  }
  manterContaPagar() {
    this.spinner.show();
    this.ContasPagarInputDialog = false;
    this.display = false;
    this.submitted = true;

    this.service.manterContasPagar(this.form.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.customMessage.onSuccessSmall();
      },
      (error: any) => {
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }

  onReload() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  editarDataPagamento(conta: ContasPagarDTO) {
    this.editarDataPgtoform = this.formBuilder.group({
      id: [conta.id],
      dataPagamento: [conta.dataPagamento, Validators.required],
    });
    this.submitted = false;

    this.editarDtPgtoDialog = true;
  }
  manterDataPagamento() {
    this.spinner.show();
    this.editarDtPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDataPagamento(this.editarDataPgtoform.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.customMessage.onSuccessSmall();
      },
      (error: any) => {
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }
  editarLocalPagamento(conta: ContasPagarDTO) {
    this.editarLocalPgtoform = this.formBuilder.group({
      id: [conta.id],
      localPagamento: [conta.localPagamento, Validators.required],
    });
    this.submitted = false;
    this.editarLocalPgtoDialog = true;
  }
  manterLocalPgto() {
    this.spinner.show();
    this.editarLocalPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterLocalPgto(this.editarLocalPgtoform.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.customMessage.onSuccessSmall();
        this.displaySideBar = false;
      },
      (error: any) => {
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }

  editarDesconto(conta: ContasPagarDTO) {
    this.editarDescontoform = this.formBuilder.group({
      id: [conta.id],
      desconto: [conta.desconto, Validators.required],
    });
    this.submitted = false;
    this.editarDescontoDialog = true;
  }
  manterDesconto() {
    this.spinner.show();
    this.editarDescontoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDesconto(this.editarDescontoform.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.customMessage.onSuccessSmall();
        this.displaySideBar = false;
      },
      (error: any) => {
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }
  editarValorDuplicata(conta: ContasPagarDTO) {
    this.editarValorDuplicataform = this.formBuilder.group({
      id: [conta.id],
      valorDuplicata: [conta.valorDuplicata, Validators.required],
    });
    this.submitted = false;
    this.editarValorDuplicataDialog = true;
  }
  manterValorDuplicata() {
    this.spinner.show();
    this.editarValorDuplicataDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterValorDuplicata(this.editarValorDuplicataform.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.customMessage.onSuccessSmall();
        this.displaySideBar = false;
      },
      (error: any) => {
        this.spinner.hide();
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar,verifique a formatação Ex: 4.000,95',
          'error'
        );
      }
    );
  }

  editarJurosMulta(conta: ContasPagarDTO) {
    this.editarJurosMultatoform = this.formBuilder.group({
      id: [conta.id],
      jurosMulta: [conta.jurosMulta, Validators.required],
    });
    this.submitted = false;
    this.editarJurosMultaDialog = true;
  }
  manterJurosMulta() {
    this.spinner.show();
    this.editarJurosMultaDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterJurosMulta(this.editarJurosMultatoform.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
        this.customMessage.onSuccessSmall();
        this.displaySideBar = false;
      },
      (error: any) => {
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }
  detalhamentoSidebar(conta: ContasPagarDTO) {
    this.detalheContas = [];
    this.detalheContas.push(conta);
    this.displaySideBar = true;
  }

  //MÉTODOS PARA EXPORTAÇÃO DE ARQUIVOS
  public exportPdf(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('contas.pdf');
    });
  }
  //Emitindo relatorio em exel
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}

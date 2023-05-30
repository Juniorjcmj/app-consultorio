import { CustomMensagensService } from './../../../services/mensagens.service';
import { EmpresaService } from './../../empresa/service/empresa-service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ContasPagarService } from '../contas-pagar.service';
import { ContasPagarDTO } from '../model/contasPagarDTO';
import { ContasPagarInput } from '../model/contasPagarInput';

import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';

import { format} from 'date-fns';

import { ClassificacaoDespesaService } from '../../classificacao-despesa/classificacao-despesa.service';

import {
  SubClassificacaoDespesa,
} from '../../classificacao-despesa/classificacao-despesa';
import { FiltroAvancado } from '../model/filtro';
import { ContasPagarPage } from './contasPagarPage';
import { AuthService } from '../../auth/auth.service';
import { CustomLocalStorageService } from '../../../services/custom-local-storage.service';




import * as XLSX from 'xlsx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page-contas-pagar',
  templateUrl: './page-contas-pagar.component.html',
  styleUrls: ['./page-contas-pagar.component.scss'],
  providers: [MessageService, ConfirmationService, CustomMensagensService],
})
export class PageContasPagarComponent implements OnInit {
  filtro: FiltroAvancado = new FiltroAvancado();

  dialogBoleto!: boolean;
  dialogComprovante!: boolean;


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
  formDeleteSituacaoPendente!: FormGroup;
  formDeleteLOteDialog: boolean = false;
  formDeleteSituacaoPendenteDialog: boolean = false;


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

  editarDtVencDialog: boolean;
  editarDataVencform!: FormGroup;

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
  public loading = false;

  private sanitizer!: DomSanitizer;

  constructor(
    private empresaService: EmpresaService,
    private service: ContasPagarService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,

    private authService: AuthService,
    private classificacaoService: ClassificacaoDespesaService,
    private customLocalStorageService: CustomLocalStorageService
  ) {
    this.ContasPagarDtoXLS = [];

    this.editarDtPgtoDialog = false;
    this.editarDtVencDialog = false;
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
    this.loading = true;
  }

  listAtual() {
    this.loading = true;
    this.service.getListaContasPagar().subscribe(
      (data) => {

        this.pagina = data;
        this.loading = false;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
        this.loading = false;
      }
    );
  }
  buscarComFiltroAtual() {
    this.loading = true;
    const filtro = this.customLocalStorageService.get('filtro');
    this.service.filtroAvancadoAvancado(filtro).subscribe(
      (data: any) => {

        this.pagina = data;
        this.subclassificacaoDespesa = [];
        this.loading = false;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
        this.loading = false;
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
    this.loading = true;
    var data = new Date();
    var primeiro = data.getDate() - data.getDay();

    let primeiroDia = new Date(data.setDate(primeiro));
    let ultimoDia = new Date(data.setDate(data.getDate() + 6));

    this.filtro.dataVencimentoInicial = format(primeiroDia, 'yyyy-MM-dd');
    this.filtro.dataVencimentoFinal = format(ultimoDia, 'yyyy-MM-dd');

    this.service.filtroAvancadoAvancado(this.filtro).subscribe(
      (data: any) => {

        this.pagina = data;
        this.subclassificacaoDespesa = [];
        this.loading = false;
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
        this.loading = false;
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

    let dtVencInput = new Date(contas.dataVencimento);

    this.subclassificacaoDespesa = [];
    this.form = this.formBuilder.group({
      id: [contas.id, Validators.required],
      empresa_id: [contas.empresaId, Validators.required],
      valorDuplicata: [contas.valorDuplicata, Validators.required],
      dataVencimento: [format(dtVencInput, 'yyyy-MM-dd'), Validators.required],
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
        this.loading = true;

        this.service.delete(record.id).subscribe(
          (data) => {
            this.loading = false;
            this.customMessage.onMessage(
              'Operação realizada com sucesso!',
              'success'
            );
            this.buscarComFiltroAtual();
            this.loading = false;
          },
          (error) => {

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
  abrirDeleteSituacaoPendente() {
    this.formDeleteSituacaoPendente = this.formBuilder.group({
      numeroDocumento: [null, Validators.required],
    });

    this.submitted = false;
    this.formDeleteSituacaoPendenteDialog = true;
  }

  deleteEmLote() {
    this.loading = true;
    this.service.deleteEmLote(this.formDeteleLote.value).subscribe(
      (data) => {
        this.loading = false;
        this.formDeleteLOteDialog = false;
        this.customMessage.onMessage(
          'Operação realizada com sucesso!',
          'success'
        );
        this.buscarComFiltroAtual();
      },
      (error) => {
        this.loading = false;
        this.customMessage.onMessage('Operação não realizada!', 'error');

      }
    );
  }
  deleteSituacaoPendente() {
    this.loading = true;
    this.service.deleteSituacaoPendente(this.formDeleteSituacaoPendente.value).subscribe(
      (data) => {
        this.loading = false;
        this.formDeleteSituacaoPendenteDialog = false;
        this.customMessage.onMessage(
          'Operação realizada com sucesso!',
          'success'
        );
        this.buscarComFiltroAtual();
      },
      (error) => {
        this.loading = false;
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
    this.loading = true;
    this.ContasPagarInputDialog = false;
    this.display = false;
    this.submitted = true;

    this.service.manterContasPagar(this.form.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();
      },
      (error: any) => {
        this.loading = false;
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
    this.loading = true;
    this.editarDtPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDataPagamento(this.editarDataPgtoform.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();
      },
      (error: any) => {
        this.loading = false;
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }
  editarDataVencimento(conta: ContasPagarDTO) {
    this.editarDataVencform = this.formBuilder.group({
      id: [conta.id],
      dataVencimento: [conta.dataVencimento, Validators.required],
    });
    this.submitted = false;

    this.editarDtVencDialog = true;
  }
  manterDataVencimento() {
    this.loading = true;
    this.editarDtVencDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDataVencimento(this.editarDataVencform.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();
      },
      (error: any) => {
        this.loading = false;
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
    this.loading = true;
    this.editarLocalPgtoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterLocalPgto(this.editarLocalPgtoform.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();

        //atualizar o side bar com a alteração realizada
        const conta = this.pagina.content.find(conta => conta.id == this.editarLocalPgtoform.value['id'] )
        this.detalhamentoSidebar(conta);

      },
      (error: any) => {
        this.loading = false;
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
    this.loading = true;
    this.editarDescontoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterDesconto(this.editarDescontoform.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();
        //atualizar o side bar com a alteração realizada
        const conta = this.pagina.content.find(conta => conta.id == this.editarDescontoform.value['id'] )
        this.detalhamentoSidebar(conta);
      },
      (error: any) => {
        this.loading = false;
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
    this.loading = true;
    this.editarValorDuplicataDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterValorDuplicata(this.editarValorDuplicataform.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();

      },
        (error: any) => {
          this.loading = false;
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
    this.loading = true;
    this.displaySideBar = false;
    this.editarJurosMultaDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manterJurosMulta(this.editarJurosMultatoform.value).subscribe(
      (data: any) => {
        this.loading = false;
        this.pagina = data;
        this.customMessage.onSuccessSmall();

        //atualizar o side bar com a alteração realizada
        const conta = this.pagina.content.find(conta => conta.id == this.editarJurosMultatoform.value['id'] )
        this.detalhamentoSidebar(conta);

      },
      (error: any) => {
        this.loading = false;
        this.customMessage.onMessage(
          'Erro ao tentar cadastrar, tente novamente',
          'error'
        );
      }
    );
  }
  detalhamentoSidebar(conta: any) {
    console.log(conta)
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
   let row = 1
   let col = 0
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  //TRABALHANDO COM ARQUIVOS DE
  deleteBoleto(record: any){

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o arquivo? ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.displaySideBar = false;

        const formData = new FormData();
          formData.append('id', record);
          this.service.deleteBoleto(formData).subscribe(
            (data) => {
              this.customMessage.onSuccessSmall();
              this. atualizarSideberComFiltroAtual(record);
            },
            (error) => {
              this.customMessage.onMessage(error, 'error');
            }
          );
            },
    });

  }
  deleteComprovante(record: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o arquivo? ',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.displaySideBar = false;
        const formData = new FormData();
          formData.append('id', record);
          this.service.deleteComprovante(formData).subscribe(
            (data) => {
              this.customMessage.onSuccessSmall();
              this. atualizarSideberComFiltroAtual(record);

            },
            (error) => {

              this.customMessage.onMessage(error, 'error');

            }
          );
            },
    });
  }
  //faz uma chamada ao servico que se comunica com api para fornecer o arquivo
  downloadBoleto(record: any): void {
    const formData = new FormData();
    formData.append('id', record);
    this.service.downloadBoleto(formData).subscribe(
      (data: Blob) => {
        this.saveFile(data);
      },
      (error) => {
        this.customMessage.onMessage('Error ao baixar arquivo!', 'error');
      }
    );
  }
  downloadComprovante(record: any): void {
    const formData = new FormData();
    formData.append('id', record);
    this.service.downloadComprovante(formData).subscribe(
      (data: Blob) => {
        this.saveFile(data);
      },
      (error) => {
        this.customMessage.onMessage('Error ao baixar arquivo!', 'error');
      }
    );
  }
  //recebe o arquivo de downloadFile e faz download
  saveFile(response: Blob) {
    //criar um objet URL temporário
    const url = window.URL.createObjectURL(response);

    //Criar um elemento <a> invisível para iniciaro download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'comprovante.pdf';

    link.click();
    window.URL.revokeObjectURL(url);
  }

  selectedFileBLOB!: any;
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let blob = new Blob(fileInput.target.files, {
          type: fileInput.target.files[0].type,
        });
        let url = window.URL.createObjectURL(blob);

        this.selectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  selectedFile!: File;
  onFileSelected(event: any) {
    if (event.target.files[0].type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF.');
      return;
    } else {
      this.selectedFile = event.target.files[0];
    }
  }
  aplicaCssErro(campo: any) {
    return {
      'ng-invalid ng-dirty': this.verificarValidTouched(campo),
    };
  }
  verificarValidTouched(campo: any) {
    return !this.form.get(campo)!.valid && this.form.get(campo)!.touched;
  }

  updateBoleto(record: any) {
    this.form = this.formBuilder.group({
      id: [record.id],
      file: [],
    });
    this.submitted = false;
    this.dialogBoleto = true;
  }

  manterBoleto() {

    this.dialogBoleto = false;
    this.display = false;
    this.submitted = true;
    this.displaySideBar = false;
    const formData = new FormData();
    const formValue = this.form.value;

    if (this.selectedFile != undefined) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    formData.append('id', formValue.id.toString());
    this.service.salvarBoleto(formData).subscribe(
      (success: any) => {

        this.customMessage.onSuccessSmall();
        this. atualizarSideberComFiltroAtual(formValue.id);
      },
      (error) => {
        this.customMessage.onMessage('Error ao atualizar arquivo!', 'error');

        return '';
      }
    );
  }

  updateComprovante(record: any) {
    this.form = this.formBuilder.group({
      id: [record.id],
      file: [],
    });
    this.submitted = false;
    this.dialogComprovante = true;
  }
  manterComprovante() {

    this.dialogComprovante = false;
    this.display = false;
    this.submitted = true;
    this.displaySideBar = false;
    const formData = new FormData();
    const formValue = this.form.value;

    if (this.selectedFile != undefined) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    formData.append('id', formValue.id.toString());
    this.service.salvarComprovante(formData).subscribe(
      (success: any) => {

        this.customMessage.onSuccessSmall();
       this. atualizarSideberComFiltroAtual(formValue.id);
      },
      (error) => {
        this.customMessage.onMessage('Error ao atualizar arquivo!', 'error');

        return '';
      }
    );
  }

  //MÉTODO RESPONSAVEL POR ATUALIZAR O SIDBAR QUAL HOUVER ALTERAÇÃO NO BOLETO OU COMPROVANTE
  atualizarSideberComFiltroAtual(id: any) {
    this.loading = true;
    const filtro = this.customLocalStorageService.get('filtro');
    this.service.filtroAvancadoAvancado(filtro).subscribe(
      (data: any) => {

        this.pagina = data;
        this.subclassificacaoDespesa = [];
        this.loading = false;
          //atualizar o side bar com a alteração realizada
          const conta = this.pagina.content.find(conta => conta.id == id )
          this.detalhamentoSidebar(conta);
      },
      (error: any) => {
        this.authService.getRedirect401(error.status);
        this.loading = false;
      }
    );


  }
}

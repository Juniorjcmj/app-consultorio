import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Comprovante } from '../comprovante';
import { Banco } from '../../banco/banco';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ComprovanteService } from '../comprovante.service';
import { BancoService } from '../../banco/banco.service';
import { EmpresaService } from '../../empresa/service/empresa-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { AuthService } from '../../auth/auth.service';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-page-comprovante',
  templateUrl: './page-comprovante.component.html',
  styleUrls: ['./page-comprovante.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageComprovanteComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  dialog!: boolean;

  Comprovante!: Comprovante;

  selected!: Comprovante[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];


  form!: FormGroup;

  display: boolean = false;


  // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;
  pagina!: Comprovante[];

  @ViewChild('myDiv') myDiv!: ElementRef;

  //PROPRIEDADES PARA COMPOR FILTRO
  bancos!: Banco[];
  empresas!: Empresa[];
  tipo!: any[];
  formFilter!: FormGroup;

  comprovanteForm!: FormGroup;
  formData: FormData = new FormData();

  constructor( private service: ComprovanteService,
    private bancoService: BancoService,
    private empresaService: EmpresaService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    ) {

      this.valorInicialFiltro();
       this.findAll();

      this.bancoService.getAll().subscribe(
        data => {
          this.bancos = data;
        },
        (error: any)=> {
             this.customMessage.onMessage("Não foi possivel carregar a lista de bancos","error");
        });

        this.empresaService.getAll().subscribe(
        data => {
          this.empresas = data;
        }
       ,(error: any)=> {
        this.customMessage.onMessage("Não foi possivel carregar a lista de empresas","error");
       }
        );
     }
  findAll() {
    this.service.filtroAvancado(this.formFilter.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data
      },
      (error: any) => {
        this.spinner.hide();
        this.authService.getRedirect401(error.status);
      }
    );
    this.tipo = [
      { label: 'PIX', value: 'PIX' },
      { label: 'DOC', value: 'DOC' },
      { label: 'TED', value: 'TED' },
    ];

  }

  ngOnInit(): void {
    this.spinner.show();

    this.comprovanteForm = this.formBuilder.group({
      files: ['', Validators.required]
    });
  }

  valorInicialFiltro(){
    var data = new Date();
    var primeiro = data.getDate() - data.getDay();

    let primeiroDia = new Date(data.setDate(primeiro));
    let ultimoDia = new Date(data.setDate(data.getDate() + 6));

      this.formFilter= this.formBuilder.group({
      bancoId: null,
      empresaId: null,
      numeroPedido: null,
      nomeCliente: null,
      numeroDocumento: null,
      dataInicial: format(primeiroDia, 'yyyy-MM-dd'),
      dataFinal: format(ultimoDia, 'yyyy-MM-dd'),
      tipo: null,


    })

  }
  onSubmit() {
    const formValue = this.form.value;

    this.formData.append('file', formValue.file);
    this.formData.append('bancoId', formValue.bancoId);
    this.formData.append('empresaId', formValue.empresaId);
    this.formData.append('numeroPedido', formValue.numeroPedido);
    this.formData.append('nomeCliente',formValue.nomeCliente);
    this.formData.append('numeroDocumento', formValue.numeroDocumento);
    this.formData.append('data', formValue.data);
    this.formData.append('valor', formValue.Valor);
    this.formData.append('tipo', formValue.tipo);


    this.service.cadastrarComprovante(this.formData).subscribe(
      response => {

        this.customMessage.onMessage("Operação realizada com sucesso! ", "success")
      },
      error => {
        this.customMessage.onMessage("Operação não  realizada ! ", "error")

      }
    );
  }
  onFileChange(event: any) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files![0];
    this.form.get('file')!.setValue(file);
  }
  openNew(){


    this.form= this.formBuilder.group({
    bancoId: [null, Validators.required],
    empresaId: [null, Validators.required],
    numeroPedido: [null, Validators.required],
    nomeCliente:  [null, Validators.required],
    numeroDocumento:  [null, Validators.required],
    data:  [null, Validators.required],
    valor:  [null, Validators.required],
    tipo:  [null, Validators.required],
    file: [null]

  });
  this.submitted = false;
  this.dialog = true;
}
edit(comprovante:Comprovante){

  var formatData = comprovante.data.getDate() - comprovante.data.getDay();
  let dataFormat = new Date(comprovante.data.setDate(formatData));

  this.form= this.formBuilder.group({
  bancoId: [comprovante.banco.id, Validators.required],
  empresaId: [comprovante.empresa.id, Validators.required],
  numeroPedido: [comprovante.numeroPedido, Validators.required],
  nomeCliente:  [comprovante.nomeCliente, Validators.required],
  numeroDocumento:  [comprovante.numeroDocumento, Validators.required],
  data:  [format(dataFormat, 'yyyy-MM-dd'), Validators.required],
  valor:  [comprovante.valor, Validators.required],
  tipo:  [comprovante.tipo, Validators.required],
  file: [null]

});
this.submitted = false;
this.dialog = true;
}
delete(record: Comprovante) {

  this.confirmationService.confirm({
    message: 'Tem certeza que deseja excluir ' + record.numeroPedido + '?',
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
hideDialog() {
  this.dialog = false;
  this.display = false;
  this.submitted = false;
}
manter() {

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

      if(error.status == "422"){
        this.customMessage.onMessage("Comprovante já cadastrado", "error")
      }else{
         this.customMessage.onMessage("Error ao cadastrar", "error")
      }
      this.spinner.hide();


      return '';
    }
  );
}

//MÉTODOS PARA FILTRO AVANÇADO

resetarFiltro(){
  this.formFilter.reset()
}
filtroAvancado() {
  this.spinner.show();
 this.service.filtroAvancado(this.formFilter.value).subscribe(
  (data: any) =>{
        this.spinner.hide();
        this.pagina = data

  }, (error: any)=>{
    this.spinner.hide();
   this.customMessage.onMessage("Erro ao realizar pesquisa!", "error")
  }
);
}

selectedFile!: File;
onFileSelected(event: any) {

   if (event.target.files[0].type !== 'application/pdf') {
    alert('Por favor, selecione um arquivo PDF.');
    return;
  }else{
     this.selectedFile = event.target.files[0];
  }
}

onUpload() {
  const formData = new FormData();
  const formValue = this.form.value;
  formData.append('file', this.selectedFile, this.selectedFile.name);
  formData.append('nomeCliente',formValue.nomeCliente.toString());
  formData.append('empresaId',formValue.empresaId.toString());
  formData.append('bancoId',formValue.bancoId.toString());
  formData.append('tipo',formValue.tipo.toString());
  formData.append('data',formValue.data.toString());
  formData.append('valor',formValue.valor.toString());
  formData.append('numeroPedido',formValue.numeroPedido.toString());
  formData.append('numeroDocumento',formValue.numeroDocumento.toString());


  this.httpClient.post('http://localhost:98/V1/api-comprovante/comprovante', formData).subscribe(
    (success:any) => {
      this.findAll()
      this.customMessage.onMessage("Operação realizada com sucesso! ", "success")
    },
    (error) => {

      if(error.status == "422"){
        this.customMessage.onMessage("Comprovante já cadastrado", "error")
      }else{
         this.customMessage.onMessage("Error ao cadastrar", "error")
      }
      this.spinner.hide();
      return '';
    }
  );
}
verificarValidTouched(campo: any){
    return !this.form.get(campo)!.valid &&  this.form.get(campo)!.touched
}
aplicaCssErro(campo: any){
  return {
    'ng-invalid ng-dirty': this.verificarValidTouched(campo)
  }
}

createSafeUrlFromBlob(blob: Blob): SafeUrl  {
  //
  const url = URL.createObjectURL(blob);
  const safeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  // revogue o URL assim que não precisar mais dele
  URL.revokeObjectURL(url);
  return safeUrl;
}
openPdfInNewTab(blob: Blob) {
  const url = this.createSafeUrlFromBlob(blob) as string;
  window.open(url, '_blank');
}

 selectedFileBLOB!: any;
fileChangeEvent(fileInput: any) {

  if (fileInput.target.files && fileInput.target.files[0]) {

    const reader = new FileReader();
    reader.onload = (e: any) => {

  let blob = new Blob(fileInput.target.files, { type: fileInput.target.files[0].type });
      let url = window.URL.createObjectURL(blob);

      this.selectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);

    };
    reader.readAsDataURL(fileInput.target.files[0]);

  }

}
  dowload(blob: Blob): void {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'Download PDF';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove()
  }
}

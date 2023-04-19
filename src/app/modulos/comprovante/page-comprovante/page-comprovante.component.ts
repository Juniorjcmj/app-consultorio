import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Comprovante } from '../comprovante';
import { Banco } from '../../banco/banco';
import { Empresa } from '../../conciliacao-cartao/model/conciliacaoCartao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprovanteService } from '../comprovante.service';
import { BancoService } from '../../banco/banco.service';
import { EmpresaService } from '../../empresa/service/empresa-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { AuthService } from '../../auth/auth.service';
import { format } from 'date-fns';

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
  constructor( private service: ComprovanteService,
    private bancoService: BancoService,
    private empresaService: EmpresaService,
    private customMessage: CustomMensagensService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService) {

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
      tipo: null

    })

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

  });
  this.submitted = false;
  this.dialog = true;
}
edit(comprovante:Comprovante){

  this.form= this.formBuilder.group({
  bancoId: [comprovante.banco.id, Validators.required],
  empresaId: [comprovante.empresa.id, Validators.required],
  numeroPedido: [comprovante.numeroPedido, Validators.required],
  nomeCliente:  [comprovante.nomeCliente, Validators.required],
  numeroDocumento:  [comprovante.numeroDocumento, Validators.required],
  data:  [comprovante.data, Validators.required],
  valor:  [comprovante.valor, Validators.required],
  tipo:  [comprovante.tipo, Validators.required],

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


}

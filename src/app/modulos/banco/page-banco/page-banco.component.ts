import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Credito } from '../../compras/model/credito';
import { Banco } from '../banco';
import { BancoService } from '../banco.service';
import { CustomMensagensService } from 'src/app/services/mensagens.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-page-banco',
  templateUrl: './page-banco.component.html',
  styleUrls: ['./page-banco.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PageBancoComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  bancoDialog!: boolean;

  banco!: Banco;

  selectedBanco!: Banco[];

  submitted!: boolean;

  statuses!: any[];

  exportColumns: any[] = [];

  bancoXLS!: Banco[];

  stateOptions!: any[];

  form!: FormGroup;


  display: boolean = false;
  pagina!: Banco[];


  constructor(private service: BancoService,
    private messageService: MessageService,
    private customMessage: CustomMensagensService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService) {
      this.getAll();
    }

  ngOnInit(): void {
    this.spinner.show();
  }


  getAll(){
    this.service.getAll().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.pagina = data;
      },
      (error) => {
        this.spinner.hide();
        this.authService.getRedirect401(error.status);
      }
    );
  }
  openNew() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required]
    });
    this.submitted = false;
    this.bancoDialog = true;
  }
  openEdit(banco: Banco) {
    this.form = this.formBuilder.group({
      id: [banco.id],
      nome: [banco.nome, Validators.required]
    });
    this.submitted = false;
    this.bancoDialog = true;
  }
  manter() {

    this.spinner.show();
    this.bancoDialog = false;
    this.display = false;
    this.submitted = true;
    this.service.manter(this.form.value).subscribe(
      (success:any) => {
        this.spinner.hide();
        this.customMessage.onSuccessSmall();
        setTimeout(() => {}, 6000);
        this.form.reset();
        this.getAll();
      },
      (error) => {
        this.spinner.hide();
        this.form.reset();
        this.customMessage.onMessage("Error ao cadastrar", "error")
      }
    );
  }
  delete(record: Credito) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ' + record.id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //codigo para excluir
        this.spinner.show();
        this.service.delete(record.id).subscribe(
          (data) => {
             this.customMessage.onMessage("Excluido com sucesso!!", "success")
             this.getAll();
          },
          (error) => {
            this.spinner.hide();
            this.customMessage.onMessage("Erro ao tentar excluir", "error")
          }
        );
      },
    });
  }
  hideDialog() {
    this.bancoDialog = false;
    this.display = false;
    this.submitted = false;
  }
}

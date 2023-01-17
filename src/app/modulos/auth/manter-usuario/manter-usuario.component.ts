import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { UsuarioServiceService } from '../usuario-service.service';
import { Observable, map, catchError, tap, of } from 'rxjs';
import { UsuarioModel } from '../model/usuarioInput';
import { CustomMensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-manter-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrls: ['./manter-usuario.component.scss'],
  providers: [MessageService, ConfirmationService, CustomMensagensService],
})
export class ManterUsuarioComponent implements OnInit {


 pagina$: Observable<UsuarioModel[]>;

  constructor(private service: UsuarioServiceService, private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private authService: AuthService) {

      this.pagina$ = this.service.getAll().pipe(
        tap((s) => {
          console.log(s)
          this.spinner.hide();
        }),
        catchError((erros) => {
          this.spinner.hide();
          return of([]);
        })
      )

      }


  ngOnInit(): void {
  }

}

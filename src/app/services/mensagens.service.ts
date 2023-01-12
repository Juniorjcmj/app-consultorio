import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CustomMensagensService {

  constructor() { }


  onMessage(mensagem:any, icon: any){
    Swal.fire({
      icon: icon,
      title: mensagem,
      text: 'Click no botão para sair'
    })
  }

  onSuccessSmall(){

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Operação realizada com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
  }


}

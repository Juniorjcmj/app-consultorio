import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor() { }

  mensagemError(msg: string ){

    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }
  mensagemSucces(msg: string ){
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ConciliacaoCartaoService } from '../service/conciliacao-service';
import { Observable } from 'rxjs';
import { ConciliacaoCartao } from '../model/conciliacaoCartao';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

 // conciliacaoCartoes$: Observable<ConciliacaoCartao[]>;

  constructor(private conciliacaoCartaoService: ConciliacaoCartaoService) {
    console.log(localStorage)

    console.log("Carregando componente list")
    this.conciliacaoCartaoService.getAll().subscribe(
      data => {
            console.log(data)
      },
      error => {
        localStorage.clear();
      }
    )
   }

  ngOnInit(): void {
  }

}

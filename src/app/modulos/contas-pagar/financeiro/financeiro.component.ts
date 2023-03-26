import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  dados = [
    {
      name: 'Gasto Fixo',
      series: [
        {
          name: '2021',
          value: 436812.25,
        },
        {
          name: '2022',
          value: 653611.50,
        },
        {
          name: '2023',
          value: 446871.05,
        },
      ],
    },
    {
      name: 'Gasto Variável',
      series: [
        {
          name: '2021',
          value: 880935.19,
        },
        {
          name: '2022',
          value: 607491.45,
        },
        {
          name: '2023',
          value: 771547.35,
        },
      ],
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}

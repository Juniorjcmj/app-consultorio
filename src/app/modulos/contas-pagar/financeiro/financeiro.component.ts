import { Component, OnInit } from '@angular/core';
import { ContasPagarService } from '../contas-pagar.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
})
export class FinanceiroComponent implements OnInit {

  despesasFixas: string[] = [];
  despesasVariaveis: string[] = [];

  basicData: any;
  basicOptions: any;

  constructor(private service: ContasPagarService) {

    this.service.getDespesasUltimosSeisMeses().subscribe(
      (data: any) => {
       console.log(data)
      },
    )
    this.service.getDespesasUltimosSeisMesesPorTipo("FIXA").subscribe(
      (data: any) => {
       console.log(data)
      },
    )
    this.service.getDespesasUltimosSeisMesesPorTipo("VARIAVEL").subscribe(
      (data: any) => {
       console.log(data)
      },
    )
  }

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'line',
                    label: 'TENDÊNCIA',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                  type: 'bar',
                  label: 'DESPESAS FIXA',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: [21, 84, 24, 75, 37, 65, 34],
                  borderColor: 'white',
                  borderWidth: 2
              },
              {
                type: 'bar',
                label: 'DESPESAS VARIÁVEIS',
                backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                data: [41, 52, 24, 74, 23, 21, 32]
            }
      ],

    };
    this.basicOptions = {
      maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
      scales: {
        x: {
          ticks: {
              color: textColorSecondary
          },
          grid: {
              color: surfaceBorder
          }
      },
      y: {
        ticks: {
            color: textColorSecondary
        },
        grid: {
            color: surfaceBorder
        }
    }
      },
    };
  }
}

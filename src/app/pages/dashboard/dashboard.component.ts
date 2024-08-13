import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user: string = 'Daniel Silva'

  //Totais
  receitaTotal: number = 150000;
  receitaAReceber: number = 100000;
  receitaEfetivada: number = 50000;

  nomeacaoTotal: number = 50;
  nomeacoesRecusadas: number = 20;
  nomeacoesPendentes: number = 1;
  nomeacoesAceitas: number = 29;

  geralComarcas!: number;
  comarcasCidades!: number;
  comarcasEstados!: number;

  geralLaudos: number = 60;
  laudosNaoIniciado: number = 0;
  laudosEmAndamento: number = 0;
  laudosConcluidos: number = 60;

  totalJusticaGratuita!: number;

  data: any;
  performanceData: any;

  processosRecentes = [
    { numero: '2021.01.001', data: new Date(), status: 'Pendente' },
    { numero: '2021.01.002', data: new Date(), status: 'Concluído' },
    // Adicione mais processos recentes conforme necessário
  ];

  ngOnInit() {
    this.data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Laudos Emitidos',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };
    this.performanceData = {
      labels: ['Processo 1', 'Processo 2', 'Processo 3', 'Processo 4'],
      datasets: [
        {
          label: 'Desempenho',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81]
        },
        {
          label: 'Média',
          backgroundColor: '#66BB6A',
          data: [28, 48, 40, 19]
        }
      ]
    };
  }

  
}

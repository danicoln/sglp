import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private config: PrimeNGConfig){}

  ngOnInit(): void {
    this.updateFavicon();
    this.config.setTranslation({
      accept: 'Sim',
      reject: 'Não',
      dateFormat: 'dd/mm/yy',
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago",
      "Set", "Out", "Nov", "Dez"],
      today: "hoje"
    });
  }

   // Verifica se o tema do navegador é escuro
   isDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Retorna o caminho do favicon com base no tema do navegador
  getFaviconPath(): string {
    return this.isDarkMode() ? 'src/assets/favicon.ico' : 'favicon.ico';
  }

  updateFavicon(): void {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', this.getFaviconPath());
    }
  }

}

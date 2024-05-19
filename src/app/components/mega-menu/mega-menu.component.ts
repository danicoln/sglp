import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.css'
})
export class MegaMenuComponent implements OnInit {

  itens: MegaMenuItem[] | undefined;

  ngOnInit() {
      this.itens = [
        {
          label: 'Laudos',
          icon: 'pi pi-box',
          items:
          [
            [
              {
                label: 'Laudos',
                items: [
                  {
                    label: 'Consultar',
                    icon: 'pi pi-box',
                    routerLink: '/laudos'
                  }
                ],
              }
            ],
          ]
        },
        {
          label: 'Processos',
          icon: 'pi pi-box',
          items:
          [
            [
              {
                label: 'Processos',
                items: [
                  {
                    label: 'Novo',
                    icon: 'pi pi-box',
                    routerLink: '/processos/novo'
                  },
                  {
                    label: 'Listar',
                    icon: 'pi pi-box',
                    routerLink: '/processos'
                  }
                ],
              }
            ],
          ]
        },
        {
          label: 'Exames',
          icon: 'pi pi-box',
          items:
          [
            [
              {
                label: 'Exame da Matéria',
                items: [
                  {
                    label: 'Novo',
                    icon: 'pi pi-box',
                    routerLink: 'exames/novo'
                  },
                  // {
                  //   label: 'Listar',
                  //   icon: 'pi pi-box',
                  //   routerLink: 'exames'
                  // },
                  {
                    label: 'Consultar',
                    icon: 'pi pi-box',
                    routerLink: 'exames'
                  }
                ],
              },
              {
                label: 'Objetos do Laudo',
                icon: 'pi pi-box',
                items: [
                  {
                    label: 'Novo',
                    routerLink: '/objetos/novo'
                  },
                  {
                    label: 'Listar',
                    routerLink: '/objetos'
                  }
                ],
              }
            ],
          ]
        },
        {
          label: 'Quesitos',
          icon: 'pi pi-box',
          items:
          [
            [
              {
                label: 'Quesitos',
                items: [
                  {
                    label: 'Novo',
                    icon: 'pi pi-box',
                    routerLink: '/quesitos/novo'
                  },
                  {
                    label: 'Listar',
                    icon: 'pi pi-box',
                    routerLink: '/quesitos'
                  }
                ],
              }
            ],
          ]
        }
      ];
  }
}

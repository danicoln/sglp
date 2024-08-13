import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.css'
})
export class MegaMenuComponent implements OnInit {

  @Input() id: string = '';
  @Input() customClass: string = '';
  @Input() additionalItems: MegaMenuItem[] = [];
  itens: MegaMenuItem[] = [];

  constructor(private router: Router) {
  }
  
  ngOnInit(): void {
    this.initializeMenuItems();

   
  }

  private initializeMenuItems(): void {
    this.itens = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Laudos',
        icon: 'pi pi-file',
        items: [
          [
            {
              label: 'Laudos',
              items: [
                {
                  label: 'Novo',
                  icon: 'pi pi-file',
                  routerLink: '/laudos/novo'
                },
                {
                  label: 'Listar',
                  icon: 'pi pi-list',
                  routerLink: '/laudos'
                },
              ]
            },
          ]
        ]
      },
      {
        label: 'Processos',
        icon: 'pi pi-briefcase',
        items: [
          [
            {
              label: 'Processos',
              items: [
                {
                  label: 'Novo',
                  icon: 'pi pi-file',
                  routerLink: '/processos/novo'
                },
                {
                  label: 'Listar',
                  icon: 'pi pi-list',
                  routerLink: '/processos'
                },
              ]
            }
          ]
        ]
      },
      {
        label: 'Advogados',
        icon: 'pi pi-user',
        items: [
          [
            {
              label: 'Advogados',
              items: [
                {
                  label: 'Novo',
                  icon: 'pi pi-file',
                  routerLink: '/advogados/novo'
                },
                {
                  label: 'Listar',
                  icon: 'pi pi-list',
                  routerLink: '/advogados'
                },
              ]
            }
          ]
        ]
      },
      {
        label: 'Nomeações',
        icon: 'pi pi-id-card',
        items: [
          [
            {
              label: 'Nomeações',
              items: [
                {
                  label: 'Nova',
                  icon: 'pi pi-file',
                  routerLink: '/nomeacoes/novo'
                },
                {
                  label: 'Listar',
                  icon: 'pi pi-list',
                  routerLink: '/nomeacoes'
                },
              ]
            }
          ]
        ]
      },
      // {
      //   label: 'Perito',
      //   icon: 'pi pi-user-edit',
      //   routerLink: '/perito'
      // },
      // {
      //   label: 'Assistente Técnico',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/assistente-tecnico'
      // }
    ];
  }

  private updateMenuItems(url: string): void {
    if(url.startsWith('/laudos')){
      const laudoItems: MegaMenuItem[] = [
        {
          label: 'Exame',
          icon: 'pi pi-file',
          items: [
            [
              {
                label: 'Exame',
                items: [
                  {
                    label: 'Novo',
                    icon: 'pi pi-file',
                    routerLink: '/exame/novo'
                  },
                  {
                    label: 'Listar',
                    icon: 'pi pi-list',
                    routerLink: '/exames'
                  },
                ]
              }
            ]
          ]
        },
        {
          label: 'Quesitos',
          icon: 'pi pi-file',
          items: [
            [
              {
                label: 'Quesitos',
                items: [
                  {
                    label: 'Novo',
                    icon: 'pi pi-file',
                    routerLink: '/quesitos/novo'
                  },
                  {
                    label: 'Listar',
                    icon: 'pi pi-list',
                    routerLink: '/quesitos'
                  },
                ]
              }
            ]
          ]
        }
      ];

      this.itens = [
        ...this.itens.filter(item => item.label !== 'Exame' && item.label !== 'Quesitos'),
        ...laudoItems
      ];
    } else {
      this.itens = this.itens.filter(item => item.label !== 'Exame' && item.label !== 'Quesitos');
    }
  }
}

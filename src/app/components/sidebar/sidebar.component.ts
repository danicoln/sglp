import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  nomeUsuario: string = 'Daniel Lincoln';

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;

    itemsVertical?: MenuItem[];

  ngOnInit() {
    this.itemsVertical = [
      {
        label: 'Perito',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Nomeações',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Honorários',
            icon: 'pi pi-fw pi-dollar'
          }
        ]
      },
      {
        label: 'Laudo Pericial',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Novo',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: '/laudos/novo'
          },
          {
            label: 'Consultar',
            icon: 'pi pi-fw pi-list',
            routerLink: '/laudos'
          },

        ]
      },
      {
        label: 'Processos',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Novo',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: '/processos/novo'
          },
          {
            label: 'Consultar',
            icon: 'pi pi-fw pi-list',
            routerLink: '/processos'
          },

        ]
      },

      {
        label: 'Nomeações',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Novo',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: '/nomeacoes/novo'
          },
          {
            label: 'Consultar',
            icon: 'pi pi-fw pi-list',
            routerLink: '/nomeacoes'
          }
        ]
      },
      {
        label: 'Receitas',
        icon: 'pi pi-fw pi-dollar',
        items: [
          {
            label: 'Consultar',
            icon: 'pi pi-fw pi-search',
            items: [
              {
                label: 'Filtrar',
                icon: 'pi pi-fw pi-filter'
              },
              {
                label: 'Listar',
                icon: 'pi pi-fw pi-bars'
              }
            ]
          },

        ]
      },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];
  }
}

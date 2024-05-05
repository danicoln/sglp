import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ObjetoLaudoService } from '../../objeto-laudo/shared/objeto-laudo.service';
import { ExameDaMateriaService } from '../shared/exame.service';

@Component({
  selector: 'app-exame-home',
  templateUrl: './exame-home.component.html',
  styleUrl: './exame-home.component.css'
})
export class ExameHomeComponent implements OnInit {

  tabs: string[] = ['Lista de Exames', 'Novo Exame', 'Novo Objeto', 'Objetos'];
  activatedTabIndex: number = 0;
  routerLink!: string;
  itemAtual: string = 'Exame da Matéria';
  itensMenu: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  idExistente: boolean = false;
  objetosExistentes: boolean = false;
  exibirFormulario: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exameService: ExameDaMateriaService,
    private objetoService: ObjetoLaudoService
  ){}

  ngOnInit(): void {
    const exameId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['exames']);
      this.idExistente = !!this.itemAtual;
      this.itensTabMenu();

      if(exameId) {
        this.objetoService.listar(exameId).subscribe(objetos => {
          this.objetosExistentes = objetos && objetos.length > 0;
        })
      }
  }

  itensTabMenu() {
    this.itensMenu = [
    {label: 'Exame da Matéria'},
    {label: 'Objeto do Laudo', routerLink: 'objetos'},
    ];
    this.activeItem = this.itensMenu[0];
  }

  tabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex;
  }
}

import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../../core/error-handler.service';
import { ObjetoLaudo } from '../../objeto-laudo/shared/objeto-laudo.model';
import { ObjetoLaudoService } from '../../objeto-laudo/shared/objeto-laudo.service';
import { ExameDaMateria } from '../shared/exame.model';
import { ExameDaMateriaService } from '../shared/exame.service';
import { LaudoPericial } from '../../laudo-pericial/shared/laudo-pericial';

@Component({
  selector: 'app-exame-list',
  templateUrl: './exame-list.component.html',
  styleUrl: './exame-list.component.css'
})
export class ExameListComponent implements OnInit {

  @ViewChild('tabela') tabela!: any;
  @Input() laudoId!: string;
  @Input() laudo = new LaudoPericial();
  @Input() exameId!: string;

  exameDialog: boolean = false;
  submitted: boolean = false;
  exameSelecionados!: ExameDaMateria[] | null;
  exames!: ExameDaMateria[];
  exame = new ExameDaMateria();

  quantidadeObjetos?: number = 0;
  objetos!: ObjetoLaudo[];

  constructor(
    protected injector: Injector,
    private route: ActivatedRoute,
    private error: ErrorHandlerService,
    private msgService: MessageService,
    private exameService: ExameDaMateriaService,
    private objetoService: ObjetoLaudoService,
    private router: Router
  ) { 
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.error = this.injector.get(ErrorHandlerService);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.laudoId = params['id'];
      this.exameId = params['exameId'];
      this.listar(this.laudoId);
    });
  }

  listarObjetos(exameId: string) {
    this.objetoService.listar(exameId)
      .subscribe(
        (objetos) => {
          this.objetos = objetos;
        }
      );
  }

  async listar(laudoId: string) {
    try {
      this.exame = await this.exameService.obterExame(laudoId);
      if (Object.keys(this.exame).length === 0) {
        this.msgService.add({
          severity: 'info', summary: 'Info', detail: 'Nenhum exame encontrado.', life: 3000
        });
      } else {
        this.exames = [this.exame];
        if (this.exame.id !== undefined) {
          this.listarObjetos(this.exame.id);
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  applyFilterGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.tabela && value) {
      this.tabela.filterGlobal(value, 'contains');
    }
  }

  private handleError(erro: any): void {
    this.error.handle(erro);
    this.msgService.add(
      ({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro. Por favor, tente novamente mais tarde.' })
    )
  }

  voltar() {
    this.router.navigate(['/laudos', this.laudoId, 'edit']);
  }

  // edit(id: any) {
  //   const url = this.router.url;
  //   const novaUrl = url + '/' + id + '/edit';
  //   console.log('URL:', novaUrl);
  //   this.router.navigateByUrl(novaUrl);
  // }

  edit(id: any) {
    const novaUrl = `exames/${id}/edit`;
    this.router.navigate([novaUrl], { relativeTo: this.route });
  }
}

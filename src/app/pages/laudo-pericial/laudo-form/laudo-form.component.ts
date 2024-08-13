import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaudoPericial } from '../shared/laudo-pericial';
import { LaudoPericialService } from '../shared/laudo-pericial.service';
import { ExameDaMateriaService } from '../../exame-da-materia/shared/exame.service';
import { QuesitoService } from '../../quesito/shared/quesito.service';
import { MessageComponent } from '../../../components/message/message.component';

@Component({
  selector: 'app-laudo-form',
  templateUrl: './laudo-form.component.html',
  styleUrl: './laudo-form.component.css'
})
export class LaudoFormComponent implements OnInit {

  @Input() laudo = new LaudoPericial();
  laudoId?: string;
  exibirFormExame: boolean = false;
  exibirFormQuesitos: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private laudoService: LaudoPericialService,
    private message: MessageComponent,
    private exameService: ExameDaMateriaService,
    private quesitoService: QuesitoService
  ) {
    this.exameService.mostrarForm$.subscribe(mostrar => this.exibirFormExame = mostrar);
    this.quesitoService.mostrarForm$.subscribe(mostrar => this.exibirFormQuesitos = mostrar);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if(id) {
        this.laudoId = id;
        this.laudoService.buscarPorId(this.laudoId).then(
          (laudo) => {
            this.exibirFormExame = false;
            this.exibirFormQuesitos = false;
            this.laudo = laudo;
          },
          (error) => {
            console.error('Erro!', error);
            this.message.showError('Erro!', 'Erro ao buscar o laudo');
          }
        );
      }
    });
  }

  changeLaudo(laudo: any) {
    this.laudo = laudo;
  }

  resetForms(): void {
    this.exibirFormExame = false;
    this.exibirFormQuesitos = false;
  }

}

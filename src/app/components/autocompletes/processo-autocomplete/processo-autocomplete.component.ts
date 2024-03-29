import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { Processo } from '../../../pages/processos/shared/processo.model';
import { ProcessoService } from '../../../pages/processos/shared/processo.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-processo-autocomplete',
  template: `
    <div style="display: flex;" class="container">
      <p-card class="col-6 md:col-6" [style]="{'height':'270px'}">
        <div class="title">
          <b >{{ title }}</b>
        </div>
        <p-autoComplete
          [(ngModel)]="selectedProcesso"
          [suggestions]="filtroProcessos"
          (completeMethod)="search($event)"
          field="numero"
          (processoSelecionado)="onSelectProcesso(selectedProcesso)"
          (ngModelChange)="onProcessoChange($event)"
          >
        </p-autoComplete>
        <div class="row mt-2">
          <div *ngIf="selectedProcesso && !processoConfirmado" class="btn-confirmar" style="display: contents;">
            <p-button
              class="mr-2"
              icon="pi pi-check"
              type="button"
              (click)="confirmarProcesso()"
              >
            </p-button>
          </div>
          <a
            href="/processos/novo"
            pButton
            class="p-button"
            label="Novo Processo"
            style="text-decoration: none;"
            >
            <i style="cursor: pointer;" class="pi pi-plus mr-1"></i>
          </a>

        </div>
      </p-card>
      <div class="card col-6 md:col-6" *ngIf="selectedProcesso && processoConfirmado" style="display: flex;">
        <div class="dadosProcesso-r">
          <div class="elemento" style="display: flex;">
            <p class="n-processo ml-2"><strong>Processo: </strong>{{selectedProcesso.numero}}</p>
          </div>
          <div class="elemento" style="display: flex;">
            <h4></h4>
            <p class="assunto ml-2"><strong>Assunto: </strong>{{selectedProcesso.assunto}}</p>
          </div>
          <div class="elemento" style="display: flex;">
            <p class="nomeAutor ml-2"><strong>Autor: </strong>{{selectedProcesso.nomeAutor}}</p>
          </div>
          <div class="elemento" style="display: flex;">
            <p class="nomeReu ml-2"><strong>Réu: </strong>{{selectedProcesso.nomeReu}}</p>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [
    `
     .container-r {
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
  }

  .elemento {
    width:70px;
    height:70px;
    background-color:red;
  }

  .dadosProcesso{
    display:block;
  }
    `
  ],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ProcessoAutocompleteComponent),
        multi: true
      }
    ]
})
export class ProcessoAutocompleteComponent implements OnInit {

  @Input() title!: string;
  @Input() displayField!: string;
  @Output() processoSelecionado: EventEmitter<Processo> = new EventEmitter<Processo>();

  processos!: Processo[];
  filtroProcessos!: Processo[];
  selectedProcesso: any;
  processoConfirmado: boolean = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(
    private processoService: ProcessoService
  ) { }

  ngOnInit(): void {
    this.processoService.listar()
      .then((processos: Processo[]) => this.processos = processos)
      .catch(erro => console.error('Erro ao buscar processos: ', erro));
  }

  search(event: any) {
    const query = (event.query || '').toLowerCase();
    this.filtroProcessos = this.processos.filter(processo =>
      processo?.numero?.toLowerCase().startsWith(query));

  }

  writeValue(value: any): void {
    this.selectedProcesso = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onSelectProcesso(processo: any): void {
    this.processoSelecionado = processo;
  }

  confirmarProcesso() {
    this.processoConfirmado = true;
  }

  onProcessoChange(newValue: any) {
    this.processoConfirmado = false;
  }

  }


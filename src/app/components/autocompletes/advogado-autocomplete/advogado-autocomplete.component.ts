import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Advogado } from '../../../pages/advogado/shared/advogado.model';
import { AdvogadoService } from '../../../pages/advogado/shared/advogado.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-advogado-autocomplete',
  template: `
  <div  class="nomeAdv">
    <b>Nome do Advogado:</b>
  </div>
  <div class="adv">
    <p-autoComplete
        [(ngModel)]="nomeAdvogado"
        [suggestions]="filtroAdvogados"
        (completeMethod)="filterAdvogado($event)"
        (onSelect)="onAdvogadoSelecionado($event)"
        field="nome"
        [forceSelection]="true"
        (onBlur)="onTouch()"
        dropdown="true"
        >
      </p-autoComplete>
  </div>
  `,
  styles: [
    `
    .nomeAdv {
      margin-top: 10px
    }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdvogadoAutocompleteComponent),
      multi: true
    }
  ]
})
export class AdvogadoAutocompleteComponent implements ControlValueAccessor, OnDestroy, OnInit {

  @Output() advogadoSelecionado = new EventEmitter<Advogado>();
  filtroAdvogados!: Advogado[];
  advogados: Advogado[] = [];
  advogado: Advogado | null = null;;
  nomeAdvogado: string = '';

  onChange: any = () => { };
  onTouch: any = () => { };

  constructor(
    private advogadoService: AdvogadoService
  ) { }

  ngOnInit(): void {
    this.listaAdvogados();
  }

  listaAdvogados() {
    this.advogadoService.listar()
      .then((advogados) => {
        this.advogados = advogados;
      });
  }

  filterAdvogado(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filtroAdvogados = this.advogados.filter(advogado =>
      advogado.nome?.toLowerCase().startsWith(query));
  }

  onAdvogadoSelecionado(event: any) {
    const nomeSelecionado = event;
    this.advogado = this.advogados.find(adv => adv.nome === nomeSelecionado.value.nome) || null;
    this.advogadoSelecionado.emit(this.advogado!);
    this.onChange(this.advogado);
  }

  writeValue(value: any): void {
    if (value && typeof value === 'object' && value.nome) {
      this.nomeAdvogado = value.nome;
      this.advogadoSelecionado = value;
    } else {
      this.nomeAdvogado = '';
      this.advogado = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    if (this.onChange && typeof this.onChange.unsubscribe === 'function') {
      this.onChange.unsubscribe();
    }
  }

}


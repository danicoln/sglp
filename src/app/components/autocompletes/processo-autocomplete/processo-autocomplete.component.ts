import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { Processo } from '../../../pages/processos/shared/processo.model';
import { ProcessoService } from '../../../pages/processos/shared/processo.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-processo-autocomplete',
  template: `
  <b>{{ title }}</b>
  <p-autoComplete
    [(ngModel)]="selectedProcesso"
    [suggestions]="filtroProcessos"
    (completeMethod)="search($event)"
    field="numero"
    >
  </p-autoComplete>`,
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

  processos!: Processo[];
  filtroProcessos!: Processo[];
  selectedProcesso: any;

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


}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef, inject } from '@angular/core';
import { Processo } from '../../../pages/processos/shared/processo.model';
import { ProcessoService } from '../../../pages/processos/shared/processo.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processo-autocomplete',
  template: `
    <div style="display: flex;">
      <p-card class="col-6 md:col-6" [style]="{'height':'270px'}">
        <div class="title">
          <b >{{ title }}</b>
        </div>
        <p-autoComplete
          [(ngModel)]="value"
          [suggestions]="filtroProcessos"
          (completeMethod)="search($event)"
          field="numero"
          (processoSelecionado)="onProcessoSelecionado(value)"
          (ngModelChange)="onProcessoChange(value)"
          (onBlur)="onTouch()"
          >
        </p-autoComplete>
        <div class="row mt-2">
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
      <div class="p-card col-6 md:col-6 mb-2" *ngIf="value && processoConfirmado" style="display: flex;">
        <div class="dadosProcesso-r">
          <div class="elemento" style="display: flex;">
            <p class="n-processo ml-2"><strong>Processo: </strong>{{value.numero}}</p>
          </div>
          <div class="elemento" style="display: flex;">
            <h4></h4>
            <p class="assunto ml-2"><strong>Assunto: </strong>{{value.assunto}}</p>
          </div>
          <div class="elemento" style="display: flex;">
            <p class="nomeAutor ml-2"><strong>Autor: </strong>{{value.nomeAutor}}</p>
          </div>
          <div class="elemento" style="display: flex;">
            <p class="nomeReu ml-2"><strong>Réu: </strong>{{value.nomeReu}}</p>
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

    .dadosProcesso {
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
export class ProcessoAutocompleteComponent implements ControlValueAccessor, OnDestroy, OnInit {

  @Input() title!: string;
  @Input() displayField!: string;
  @Output() processoSelecionado = new EventEmitter<string>();

  processos!: Processo[];
  filtroProcessos!: Processo[];
  processoConfirmado: boolean = false;

  private processo?: Processo;

  formGroup!: FormGroup;

  private formBuilderService = inject(FormBuilder);

  onChange: any = () => { };
  onTouch: any = () => { };

  constructor(
    private processoService: ProcessoService
  ) { }

  ngOnInit(): void {

    this.buildResourceForm();

    this.processoService.listar()
      .then((processos: Processo[]) => this.processos = processos)
      .catch(erro => console.error('Erro ao buscar processos: ', erro));
  }

  private buildResourceForm() {
    this.formGroup = this.formBuilderService.group({
      processo: [null]
    });
  }

  search(event: any) {
    const query = (event.query || '').toLowerCase();
    this.filtroProcessos = this.processos.filter(processo =>
      processo?.numero?.toLowerCase().startsWith(query));

  }

  writeValue(value: any): void {
    if(value) {
      this.formGroup.setValue(value);
    }
  }

  registerOnChange(onChange: any): void {
    this.onChange = this.formGroup.valueChanges.subscribe(onChange);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    if(this.onChange && typeof this.onChange.unsubscribe === 'function'){
      this.onChange.unsubscribe();
    }
  }

  setDisabledState(isDisabled: boolean): void {
      if(isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
  }

  onProcessoSelecionado(processo: any): void {
    console.log('Autocomplete: chama onSelectProcesso: ', processo)
    this.processoSelecionado.emit(processo);
  }


  onProcessoChange(value: any) {

    this.processoConfirmado = false;
    this.processo = value;
    this.formGroup.get('processo')?.setValue(value)

    console.log('Autocomplete -> onProcessoChange: ', this.processo)
  }

  get value() {
    return this.processo;
  }

  set value(value: any) {
    if(value !== this.processo) {
      this.processo = value;
      this.onChange = value;
    }
  }


}


import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef, inject } from '@angular/core';
import { Processo } from '../../../pages/processos/shared/processo.model';
import { ProcessoService } from '../../../pages/processos/shared/processo.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processo-autocomplete',
  template: `
    <div>
      <p-card class="col-12 md:col-6">
        <section class="row processo-card" *ngIf="!processoConfirmado">

          <div class="col-6 processo-input">

            <div class="autocomplete">
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
                <div *ngIf="valorInvalido">
                  <small class="text-danger">Insira um número de processo válido</small>
                </div>
            </div>

            <div class="col-6 btn-confirmar">
              <div class="mt-2">

                <button
                  pButton
                  class="pi pi-check"
                  (click)="confirmar()"
                  >
                </button>

              </div>
            </div>
          </div>


        </section>

        <div class="col-12 md:col-6 mb-2" *ngIf="value && processoConfirmado">
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

          <div class="btn-alterar">
            <button
              pButton
              class="pi pi-angle-double-left"
              (click)="alterarProcesso()"
              >
            </button>
          </div>

        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
    .btn-confirmar, .btn-alterar {
      margin-top: 6px;
    }

    .btn-alterar{
      margin-top: auto;
    }

    .container-r {
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
    }

    .processo-card, .processo-input {
      display:flex;
    }

    .dadosProcesso, .dadosProcesso-r {
      display:block;
    }

    .text-danger{
      background-color: #ff3535c7;
      color: white;
      font-weight: bold;
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
  @Input() valorInvalido: boolean = false;
  @Input() processoConfirmado: boolean = false;
  @Input() processo!: Processo;
  @Output() processoSelecionado = new EventEmitter<string>();

  processos!: Processo[];
  filtroProcessos!: Processo[];


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
    if (value) {
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
    if (this.onChange && typeof this.onChange.unsubscribe === 'function') {
      this.onChange.unsubscribe();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  onProcessoSelecionado(processo: any) {
    this.processoSelecionado.emit(processo);
  }


  onProcessoChange(value: any) {
    this.processoConfirmado = false;
    this.processo = value;
    this.formGroup.get('processo')?.setValue(value)
  }

  get value() {
    return this.processo;
  }

  set value(value: any) {
    if (value !== this.processo) {
      this.processo = value;
      this.onChange = value;
    }
  }

  confirmar() {
    const processo = this.formGroup.get('processo')?.value;

    if (!processo) {
      return;
    }
    this.valorInvalido = true;
    this.processoConfirmado = true;
    this.processoSelecionado.emit(processo);
  }

  alterarProcesso() {
    this.valorInvalido = false;
    this.processoConfirmado = false;
  }


}


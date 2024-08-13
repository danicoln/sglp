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
                <b >Número do Processo:</b>
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
                <div *ngIf="!numeroValido">
                  <small class="text-info">Insira um número de processo válido</small>
                </div>
            </div>

            <div class="col-6 row btn-confirmar">
              <div class="mt-2">

                <app-button
                  title="Confirmar"
                  class="mr-2"
                  icon="pi pi-check"
                  (click)="confirmar()"
                  [disabled]="!numeroValido" 
                  >
                </app-button>
                <app-button
                  title="Novo Processo"
                  icon="pi pi-plus"
                  routerLink="/processos/novo"
                  >
                </app-button>
                </div>
                
            </div>
          </div>


        </section>

        <div class="col-12 md:col-6 mb-2" *ngIf="value && processoConfirmado">
          <div class="dadosProcesso-r">
            <div class="elemento" style="display: flex;">
              <app-input-text 
                [(ngModel)]="value.numero"
                [disabled]="true"
                title="Processo:"
                >
              </app-input-text>
            </div>

            <div class="mt-2 elemento" style="display: flex;">
              <app-input-text 
                [(ngModel)]="value.assunto"
                [disabled]="true"
                title="Assunto:"
                >
              </app-input-text>
            </div>
            
            <div class="mt-2 elemento" style="display: flex;">
              <app-input-text 
                [(ngModel)]="value.nomeAutor"
                [disabled]="true"
                title="Autor:"
                >
              </app-input-text>
            </div>

            <div class="mt-2 elemento" style="display: flex;">
              <app-input-text 
                [(ngModel)]="value.nomeReu"
                [disabled]="true"
                title="Réu:"
                >
              </app-input-text>
            </div>

          </div>

          <div class="mt-2 btn-alterar">
            <app-button
              icon="pi pi-angle-double-left"
              (click)="alterarProcesso()"
              >
            </app-button>
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

  @Input() tooltip!: "Novo Processo";
  @Input() title!: string;
  @Input() displayField!: string;
  @Input() processoConfirmado: boolean = false;
  @Input() processo!: Processo;
  @Output() processoSelecionado = new EventEmitter<string>();
  
  @Input() numeroValido: boolean = false;

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
    if(value !== null) {
      this.processoConfirmado = false;
      this.processo = value;
      this.formGroup.get('processo')?.setValue(value);
      this.validarNumeroProcesso(value);
    } else {
      this.formGroup.get('processo')?.setValue(null);
    }
  }

  validarNumeroProcesso(value: any) {
    this.numeroValido = !!value && value.numero && value.numero.trim().length > 0;
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

    if (processo) {
      this.numeroValido = true;
      this.processoConfirmado = true;
      this.processoSelecionado.emit(processo);
      } else {
        this.numeroValido = false;
      }
  }


  alterarProcesso() {
    this.numeroValido = true;
    this.processoConfirmado = false;
    window.location.reload();
  }


}


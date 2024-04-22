import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ObjetoLaudo } from '../../../pages/objeto-laudo/shared/objeto-laudo.model';

@Component({
  selector: 'app-objeto-laudo',
  templateUrl: './objeto-laudo.component.html',
  styleUrl: './objeto-laudo.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ObjetoLaudoComponent),
      multi: true
    }
  ]
})
export class ObjetoLaudoComponent implements ControlValueAccessor, OnInit {

  @Output() objetoAtualizado = new EventEmitter<ObjetoLaudo>();

  @Input() objetos!: FormArray;
  @Input() obj!: FormGroup;
  @Input() novaSecao!: FormGroup;
  @Input() index!: number;
  @Input() exameId!: string;
  @Input() listaObjetos!: ObjetoLaudo[];

  @Input() nomeTitulo: string = '';
  @Input() descricao: string = '';
  @Input() data: Date = new Date();

  objetoLaudo: ObjetoLaudo = new ObjetoLaudo();
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
  ) { }

  ngOnInit(): void {
  }

  writeValue(objetoLaudo: ObjetoLaudo): void {
    if (objetoLaudo !== undefined) {
      this.objetoLaudo = objetoLaudo;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  adicionar(): void {
    this.onChange(this.objetoLaudo);
    this.onTouched();
  }

  cancelar() {
    return alert('Implementar: Cancelar objeto')
  }


}

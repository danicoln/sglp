import { Component, Input, forwardRef } from '@angular/core';
import { Documento } from '../shared/documento.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-documentos-form',
  templateUrl: './documentos-form.component.html',
  styleUrl: './documentos-form.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocumentosFormComponent),
      multi: true
    }
  ]
})
export class DocumentosFormComponent implements ControlValueAccessor {

  @Input() nomeTituloLabel?: string = 'Título do Documento';
  @Input() descricaoLabel?: string = 'Descrição';
  @Input() dataLabel?: string = 'Data';
  @Input() documento: Documento = new Documento();
  @Input() titulo: string = 'Novo Documento';
  novoDocumento: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};
  value: any;

  newDocument() {
    this.novoDocumento = true;
  }

  saveDocument() {
    alert('Documento Salvo!')
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}

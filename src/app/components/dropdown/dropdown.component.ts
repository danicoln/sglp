import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {

  @Input() label?: string;
  @Input() options?: any[];
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() showClear: boolean = false;
  @Input() showTag: boolean = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  private selectedValueInternal: any;
  isDisabled: boolean = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  get selectedValue(): any {
    return this.selectedValueInternal;
  }

  set selectedValue(value: any) {
    if (value !== this.selectedValueInternal) {
      this.selectedValueInternal = value;
      this.onChange(value);
      this.onTouched();
      this.valueChange.emit(value);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.selectedValueInternal = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDropdownChange(event: any): void {
    this.selectedValue = event.value;
    this.onChange(event.value);
    this.onTouched(event.value);
  }


}

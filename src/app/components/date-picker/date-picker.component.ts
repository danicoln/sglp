import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }]
})
export class DatePickerComponent implements ControlValueAccessor{

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<any>();

  value: string | null = null;
  onChange: any = () => {};
  onTouched: any = () => {};
  isDisabled: boolean = false;

  writeValue(obj: any): void {
    if (obj) {
      const date = new Date(obj);
      this.value = date.toISOString().split('T')[0]; 
    } else {
      this.value = null;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onValueChange(event: any): void {
    this.value = event;
    this.onChange(this.value);
    this.onTouched();
  }

}

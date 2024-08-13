import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true
  }]
})
export class CalendarComponent implements ControlValueAccessor {

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() dateFormat: string = 'dd/mm/yy';

  value: Date | null = null;
  onChange: (value: Date | null) => void = () => { };
  onTouched: () => void = () => { };
  isDisabled: boolean = false;

  writeValue(obj: any): void {
    if (typeof obj === 'string') {
      this.value = new Date(obj);
    } else {
      this.value = obj;
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
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

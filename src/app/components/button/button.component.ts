import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Event } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonComponent),
    multi: true
  }]
})
export class ButtonComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'button';
  @Input() severity: 'primary' | 'secondary' | 'success' | 'info' | 'warning' |
    'danger' | 'help' | 'contrast' | undefined = undefined;

  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() raised: boolean = false;
  @Input() rounded: boolean = false;
  @Input() text: boolean = false;
  @Input() outlined: boolean = false;
  @Input() plain: boolean = false;
  @Input() disabled: boolean = false;

  @Output() click = new EventEmitter<Event>();

  onChange: any = () => { };
  onTouched: any = () => { };
  value: any;

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleClick(event: any): void {
    this.click.emit(event);
  }
}

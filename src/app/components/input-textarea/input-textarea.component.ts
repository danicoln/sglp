import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrl: './input-textarea.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextareaComponent),
    multi: true
  }]
})
export class InputTextareaComponent implements ControlValueAccessor {

  @Input() rows: string = '5';
  @Input() cols: string = '30';
  @Input() placeholder: string = '';
  @Input() variant: string = '';
  @Input() autoResize: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  form!: FormGroup;

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

  onInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}

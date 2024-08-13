import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
  }]
})
export class InputTextComponent implements ControlValueAccessor, OnInit {

  @Input() disabled: boolean = false;
  @Input() placeholder!: string;
  @Input() variant: string = '';
  @Input() type: string = 'text';
  @Input() title: string = 'Título';
  @Input() enableMessage: boolean = false;
  
  control!: FormGroup;
  messages: Message[] = [];
  isInvalid: boolean = false;
  
  onChange: any = () => { };
  onTouched: any = () => { };
  value: any;

  ngOnInit() {
    this.updateMessages();
}

  updateMessages(): void {
    this.messages = [];
    if (this.control && this.control.errors) {
      for (const key in this.control.errors) {
        if (this.control.errors.hasOwnProperty(key)) {
          this.messages.push({ severity: 'error', summary: 'Erro', detail: this.control.errors[key] });
        }
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.isInvalid ? { invalid: true } : null;
  }

  validateInput() {
    this.isInvalid = !this.value || this.value.trim() === '';
  }

  onInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
    this.updateMessages();
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
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

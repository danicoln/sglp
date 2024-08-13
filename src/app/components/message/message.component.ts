import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MessageComponent),
    multi: true
  }]
})
export class MessageComponent implements ControlValueAccessor {

  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  private value!: string;

  constructor() { }

  showMessage(title: string, text: string, icon: SweetAlertIcon = 'info') {
    Swal.fire({
      title,
      text,
      icon
    }).then(() => {
      if (this.onTouched) {
        this.onTouched();
      }
    });
  }

  showError(title: string, text: string) {
    this.showMessage(title, text, 'error');
  }

  showConfirmation(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => result.isConfirmed);
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

  triggerMessage() {
    if (this.value) {
      this.showMessage('Mensagem', this.value);
      if (this.onChange) {
        this.onChange(this.value);
      }
    }
  }

}

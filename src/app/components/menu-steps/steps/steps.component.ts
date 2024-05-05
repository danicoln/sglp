import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepsComponent),
      multi: true
    }
  ]
})
export class StepsComponent implements OnInit {

  onChange: any = () => {};
  onTouched: any = () => {};
  value: any;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDropdownChange(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched(value);
  }

}

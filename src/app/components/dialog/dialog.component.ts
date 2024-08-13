import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DialogComponent),
    multi: true
  }]
})
export class DialogComponent implements OnInit, ControlValueAccessor {

  @Input() header: string = 'Dialog';
  @Input() modal: boolean = true;
  @Input() style: any = { width: '50%' };
  @Input() maximizable: boolean = false;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();

  onChange: any = () => { };
  onTouched: any = () => { };
  value: any;

  ngOnInit(): void {

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

  showDialog() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  // saveDialog() {
  //   this.onSave.emit();
  //   this.hideDialog();
  // }
}

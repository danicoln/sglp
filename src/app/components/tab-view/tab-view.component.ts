import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabViewComponent),
      multi: true
    }
  ]
})
export class TabViewComponent {

  onChange: any = () => {};
  onTouched: any = () => {};
  value: any;

  @Input() menuItens: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  @Input() tabsArray:{titulo: string, content: string}[] = [];
  @Input() objetoAssociado: boolean = false;
  @Output() onTabChange = new EventEmitter<number>();
  activatedTab: number = 0;
  @Input() icon: string = '';
  @Input() titulo: string = '';
  @Input() passoAtual: string = '';

  ngOnInit(): void {
  }

  setTab(index: number){
    this.activatedTab = index;
    this.onTabChange.emit(this.activatedTab);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  writeValue(value: any): void {
    this.passoAtual = value;
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

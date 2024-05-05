import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabMenuComponent),
      multi: true
    }
  ]
})
export class TabMenuComponent implements OnInit {

  onChange: any = () => {};
  onTouched: any = () => {};
  value: any;

  @Input() menuItens: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  @Input() titulo: string = '';
  @Input() icon: string = '';
  @Input() passoAtual: string = '';

  ngOnInit(): void {
    this.itens();
  }

  itens() {
    if(this.menuItens?.length === 0) {
      this.menuItens.push({label: this.titulo, icon: this.icon});
      this.activeItem = this.menuItens[0];
    }
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

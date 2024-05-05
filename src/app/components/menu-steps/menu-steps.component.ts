import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-steps',
  templateUrl: './menu-steps.component.html',
  styleUrls: ['./menu-steps.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuStepsComponent),
      multi: true
    }
  ]
})
export class MenuStepsComponent implements OnInit {

  onChange: any = () => {};
  onTouched: any = () => {};
  value: any;

  @Input() label?: string;
  @Input() routerLink?: string;
  @Input() icon?: string;
  @Input() titulo?: string;

    menuItens: MenuItem[] | undefined;
    tabItens: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;

  //nova propriedade
  @Input() passoAtual: string = 'Exame da Matéria';
  idExistente: boolean = false;

  ngOnInit(): void {
    this.updateSteps();

  }

  selectSteps(step: string): void {
    this.passoAtual = step;
    this.onChange(this.passoAtual);
    this.onTouched();
    this.updateSteps();
  }

  updateSteps(): void {
    this.idExistente = !!this.passoAtual;
    this.menuItens = [
      {
        label: 'Exame da Matéria',
        icon: this.icon,
        command: () => this.selectSteps('Exame da Matéria'),
      },
      {
        label: 'Objeto do Laudo',
        icon: this.icon,
        disabled: this.passoAtual !== 'Objeto do Laudo',
        command: () => this.selectSteps('Objeto do Laudo'),
      }
    ];

    this.tabItens = this.menuItens.map(item => {
      return {
        label: item.label,
        routerLink: this.routerLink
      }
    });
    this.activeItem = this.menuItens[0];

  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  writeValue(value: any): void {
    this.passoAtual = value;
    this.updateSteps();
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

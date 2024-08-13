import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.css'
})
export class TabMenuComponent implements OnInit {

  @Input() itens: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  ngOnInit(): void {
    if (this.itens.length > 0) {
      this.activeItem = this.itens[0];
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  setActiveItem(index: number) {
    if (index >= 0 && index < this.itens.length) {
      this.activeItem = this.itens[index];
    }
  }

}

import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {

  @Input() title: string = '';
  @Input() active = false;
  @Input() content: TemplateRef<any> | null = null;

}

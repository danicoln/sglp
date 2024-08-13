import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  
  @Input() items: MenuItem[] | undefined;
  @Input() home: MenuItem | undefined;
  
  ngOnInit(): void {
    this.home = [
      {icon: 'pi pi-home', route: '/'}
    ]
  }


}

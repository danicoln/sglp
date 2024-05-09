import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { DropdownModule } from 'primeng/dropdown';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { ObjetivoComponent } from '../components/objetivo/objetivo.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ToastModule } from 'primeng/toast';
import { ProcessoAutocompleteComponent } from '../components/autocompletes/processo-autocomplete/processo-autocomplete.component';
import { MenuStepsComponent } from '../components/menu-steps/menu-steps.component';
import { StepsComponent } from '../components/menu-steps/steps/steps.component';
import { TabMenuComponent } from '../components/menu-steps/tab-menu/tab-menu.component';
import { TabViewComponent } from '../components/tab-view/tab-view.component';
import { TabViewModule } from 'primeng/tabview';
import { MegaMenuComponent } from '../components/mega-menu/mega-menu.component';


@NgModule({
  declarations: [
    ObjetivoComponent,
    DropdownComponent,
    ProcessoAutocompleteComponent,
    MenuStepsComponent,
    TabMenuComponent,
    StepsComponent,
    TabViewComponent,
    MegaMenuComponent

  ],
  imports: [

    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    CardModule,
    FieldsetModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    TabMenuModule,
    StepsModule,
    ToastModule,
    PanelModule,
    TabViewModule,
    MegaMenuModule,

  ],
  exports: [
    ObjetivoComponent,
    DropdownComponent,
    ProcessoAutocompleteComponent,
    MenuStepsComponent,
    TabMenuComponent,
    StepsComponent,
    TabViewComponent,
    MegaMenuComponent
  ]
})
export class SharedModule { }

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
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProcessoAutocompleteComponent } from '../components/autocompletes/processo-autocomplete/processo-autocomplete.component';
import { MegaMenuComponent } from '../components/mega-menu/mega-menu.component';
import { MenuStepsComponent } from '../components/menu-steps/menu-steps.component';
import { StepsComponent } from '../components/menu-steps/steps/steps.component';
import { TabMenuComponent } from '../components/menu-steps/tab-menu/tab-menu.component';
import { TabViewComponent } from '../components/tab-view/tab-view.component';


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
    ToastModule,
    ToolbarModule,
    TableModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    TagModule,
    RatingModule,


  ],
  exports: [
    ObjetivoComponent,
    DropdownComponent,
    ProcessoAutocompleteComponent,
    MenuStepsComponent,
    TabMenuComponent,
    StepsComponent,
    TabViewComponent,
    MegaMenuComponent,

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
    ToastModule,
    ToolbarModule,
    TableModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    TagModule,
    RatingModule,


  ]
})
export class SharedModule { }

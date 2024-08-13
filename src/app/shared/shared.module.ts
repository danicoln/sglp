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
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MegaMenuModule } from 'primeng/megamenu';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AdvogadoAutocompleteComponent } from '../components/autocompletes/advogado-autocomplete/advogado-autocomplete.component';
import { ProcessoAutocompleteComponent } from '../components/autocompletes/processo-autocomplete/processo-autocomplete.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../components/button/button.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { InputNumberComponent } from '../components/input-number/input-number.component';
import { InputSwitchComponent } from '../components/input-switch/input-switch.component';
import { InputTextComponent } from '../components/input-text/input-text.component';
import { InputTextareaComponent } from '../components/input-textarea/input-textarea.component';
import { MenuStepsComponent } from '../components/menu-steps/menu-steps.component';
import { StepsComponent } from '../components/menu-steps/steps/steps.component';
import { MessageComponent } from '../components/message/message.component';
import { TabViewComponent } from '../components/tab-view/tab-view.component';
import { ChatOpenaiFormComponent } from '../pages/chat-openai/chat-openai-form/chat-openai-form.component';
import { GptAssistenteComponent } from '../pages/chat-openai/gpt-assistente/gpt-assistente.component';
import { TabMenuComponent } from '../components/tab-menu/tab-menu.component';
import { CustomTabsComponent } from '../components/custom-tabs/custom-tabs.component';
import { TabComponent } from '../components/custom-tabs/tab/tab.component';

const COMPONENTS = [
  ObjetivoComponent,
  DropdownComponent,
  MenuStepsComponent,
  StepsComponent,
  TabViewComponent,
  ProcessoAutocompleteComponent,
  AdvogadoAutocompleteComponent,
  CalendarComponent,
  DatePickerComponent,
  InputSwitchComponent,
  InputNumberComponent,
  ChatOpenaiFormComponent,
  GptAssistenteComponent,
  ButtonComponent,
  InputTextareaComponent,
  MessageComponent,
  InputTextComponent,
  DialogComponent,
  BreadcrumbComponent,
  TabMenuComponent,
  CustomTabsComponent,
  TabComponent
]

@NgModule({
  declarations: [ COMPONENTS ],

  imports: [
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
    ProgressBarModule,
    InputSwitchModule,
    InputNumberModule,
    ChartModule,
    SidebarModule,
    MessagesModule,
    FloatLabelModule,
    BreadcrumbModule,

  ],
  exports: [
    COMPONENTS,
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
    ProgressBarModule,
    ChartModule,
    SidebarModule,
    MessagesModule,
    FloatLabelModule

  ]
})
export class SharedModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import {ButtonModule} from 'primeng/button'
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table'
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';
import {AccordionModule} from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import{MultiSelectModule} from 'primeng/multiselect'
import { PaginatorModule } from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';



@NgModule({
  declarations: [

  ],
  imports: [

  ],
   exports:
   [
    ButtonModule,
    MenubarModule,
    CardModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CalendarModule,
    SelectButtonModule,
    InputMaskModule,
    FieldsetModule,
    AccordionModule,
    TooltipModule,
    DividerModule,
    SidebarModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule


   ]

})
export class PrimengModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
   ],

})
export class PrimengModule { }

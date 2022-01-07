import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageSetupComponent } from './storage-setup.component';
import { TranslateModule} from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StorageSetupComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    TranslateModule,NgMultiSelectDropDownModule.forRoot(),
    ColorPickerModule, RouterModule
  ],
    exports: [ StorageSetupComponent ]
})
export class StorageSetupModule  { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UdiseSetupComponent } from './udise-setup.component';
import { TranslateModule} from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [UdiseSetupComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    TranslateModule,NgMultiSelectDropDownModule.forRoot(),
    ColorPickerModule, 
  ],
    exports: [ UdiseSetupComponent ]
})
export class UdiseSetupModule  { }

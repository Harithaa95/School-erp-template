import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingStepperComponent } from './setting-stepper.component';
import { TranslateModule} from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [SettingStepperComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    TranslateModule,NgMultiSelectDropDownModule.forRoot(),  
  ],
    exports: [ SettingStepperComponent ]
})
export class SettingStepperModule  { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingStepperComponent } from './setting-stepper.component';
import { TranslateModule} from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [SettingStepperComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
    exports: [ SettingStepperComponent ]
})
export class SettingStepperModule  { }

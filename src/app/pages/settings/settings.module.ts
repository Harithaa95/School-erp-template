import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    TranslateModule,  
  ],
    exports: [ SettingsComponent ]
})
export class SettingsModule { }
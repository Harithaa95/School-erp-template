import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffDetailsComponent } from './staff-details.component';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [StaffDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,  
  ],
    exports: [ StaffDetailsComponent ]
})
export class StaffDetailsModule { }

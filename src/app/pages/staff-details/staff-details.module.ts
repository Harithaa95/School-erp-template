import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffDetailsComponent } from './staff-details.component';
import { TranslateModule} from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [StaffDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,NgbModule, 
  ],
    exports: [ StaffDetailsComponent ]
})
export class StaffDetailsModule { }

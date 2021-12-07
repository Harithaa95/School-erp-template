import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [AssessmentComponent],
  imports: [
    CommonModule,
    TranslateModule,  
  ],
    exports: [ AssessmentComponent ]
})
export class AssessmentModule { }

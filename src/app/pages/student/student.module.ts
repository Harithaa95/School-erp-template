import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    TranslateModule,  
  ],
    exports: [ StudentComponent ]
})
export class StudentModule { }

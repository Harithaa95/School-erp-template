import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponent } from './global.component';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [GlobalComponent],
  imports: [
    CommonModule,
    TranslateModule,  
  ],
    exports: [ GlobalComponent ]
})
export class GlobalModule  { }

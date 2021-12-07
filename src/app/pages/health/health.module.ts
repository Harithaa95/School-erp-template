import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthComponent } from './health.component';
import { TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [HealthComponent],
  imports: [
    CommonModule,
    TranslateModule,  
  ],
    exports: [ HealthComponent ]
})
export class HealthModule { }

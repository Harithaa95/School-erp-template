import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'topbar-cmp',
  templateUrl: './tobar.component.html',
  moduleId: module.id,
})

export class TopBarComponent{
  constructor(private translateService:TranslateService){}
}

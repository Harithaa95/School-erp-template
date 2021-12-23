import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'topbar-cmp',
  templateUrl: './topbar.component.html',
  moduleId: module.id,
  styleUrls: ['./topbar.component.scss']
})

export class TopBarComponent{
  constructor(private translateService:TranslateService){}
}

import { Component, Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { GlobalComponent } from '../global/global.component';

@Component({
  selector: 'topbar-cmp',
  templateUrl: './topbar.component.html',
  moduleId: module.id,
  styleUrls: ['./topbar.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class TopBarComponent{

  siteName :string

  constructor(private translateService:TranslateService, private global : GlobalComponent){ }

  ngOnInit(givenValue,showPreview){
    if(showPreview){
      this.siteName = givenValue;
    }else{
      this.siteName = this.global.portalName
    }
    console.log(this.siteName)
  }
  ngOnChanges() {
     console.log(this.siteName);
  } 
}

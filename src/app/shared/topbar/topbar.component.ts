import { Component, Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AdminServiceService } from 'app/services/admin-service.service';
import { GlobalComponent } from '../global/global.component';

import {Title} from "@angular/platform-browser";

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
  token: string = '';
  stateName: string;

  favIcon: HTMLLinkElement = document.querySelector('#appIcon');

  constructor(
    private translateService:TranslateService, 
    private global : GlobalComponent,
    private adminService: AdminServiceService,
    private titleService: Title){ }

  ngOnInit(givenValue,showPreview){
    this.token = sessionStorage.getItem('token');
    this.adminService.stateInfoFun(this.token).subscribe((res: any) => {
      // this.titleService.setTitle(res.responseData[0].portalName);
      // this.stateName = res.responseData[0].stateName;
      // this.siteName = res.responseData[0].portalName;
      if(sessionStorage.getItem('token') !== null) {
        this.siteName = res.responseData[0].portalName;
        this.titleService.setTitle(res.responseData[0].portalName);
        this.stateName = res.responseData[0].stateName;
      } else {
        this.siteName = this.global.portalName
      }
    })
  }

  portal(title?: any){
    document.getElementById('title').innerHTML = title;
    // return this.siteName
  } 

  logo(imageUrl?: any) {
    let img = document.getElementById('logoImage');
    if (img instanceof HTMLImageElement) img.src = imageUrl;
  }

  favicon(imageUrl?: any) {
    this.favIcon.href = imageUrl;
  }
}

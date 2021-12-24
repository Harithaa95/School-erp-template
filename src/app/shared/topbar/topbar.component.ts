import { Component, Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AdminServiceService } from 'app/services/admin-service.service';
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

  constructor(
    private translateService:TranslateService, 
    private global : GlobalComponent,
    private adminService: AdminServiceService){ }

  ngOnInit(givenValue,showPreview){
    this.adminService.stateInfoFun().subscribe((res: any) => {
      if(sessionStorage.getItem('token') !== null) {
        this.siteName = res.responseData[0].portalName;
      } else {
        this.siteName = this.global.portalName
      }
    })
    // if(showPreview){
    //   this.siteName = givenValue;
    // }else{
      
    // }
    // console.log(this.siteName)
  }
  portal(){
    return this.siteName
  } 
}

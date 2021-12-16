import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  constructor(private translateService:TranslateService){
    document.documentElement.style.setProperty('--primary','#7251ce' );
    document.documentElement.style.setProperty('--secondary','green' );
  }
}

import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
@Injectable({
  providedIn: 'root'
})

export class GlobalComponent {
  portalName : string = "Government of Pudhuchery"
  primaryColor : string
  secondaryColor : string
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'udise-setup',
  templateUrl: './udise-setup.component.html',
  styleUrls: ['./udise-setup.component.css']
})
export class UdiseSetupComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  backfunc(){
    this.router.navigate(['/settingStepper']);
  }

}

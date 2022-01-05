import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  backfunc(){
    this.router.navigate(['/settingStepper']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'storage-setup',
  templateUrl: './storage-setup.component.html',
  styleUrls: ['./storage-setup.component.css']
})
export class StorageSetupComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  backfunc(){
    this.router.navigate(['/settingStepper']);
  }
}

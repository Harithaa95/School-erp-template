import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'udise-setup',
  templateUrl: './udise-setup.component.html',
  styleUrls: ['./udise-setup.component.css']
})
export class UdiseSetupComponent implements OnInit {

  isUdiseDetailsSubmitted: boolean = false;

  udiseDetails: FormGroup;

  constructor( 
    public router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.udiseDetails = this.formBuilder.group({
      udiseId: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get udiseInformationFormControl() { return this.udiseDetails.controls; }

  backfunc(){
    this.router.navigate(['/settingStepper']);
  }

  udiseDetailsSubmit(udiseFormValue: any) {
    this.isUdiseDetailsSubmitted = true;
    console.log(this.udiseDetails.valid);
    if (this.udiseDetails.valid) {
      console.log(udiseFormValue.value);
      console.log(this.udiseDetails);
      this.toastrService.success("Data Inserted Successfully!", "", {
        timeOut: 2000,
      });
    }
  }

}

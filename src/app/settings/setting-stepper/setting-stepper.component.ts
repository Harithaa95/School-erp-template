import { Component, OnInit } from '@angular/core';
// import Stepper from 'bs-stepper';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-setting-stepper',
  templateUrl: './setting-stepper.component.html',
  styleUrls: ['./setting-stepper.component.css']
})
export class SettingStepperComponent implements OnInit {
  // name = 'Angular';
  // private stepper: Stepper;
  // constructor() { }
  // next() {
  //   this.stepper.next();
  // }

  // onSubmit() {
  //   return false;
  // }

  // ngOnInit() {
  //   this.stepper = new Stepper(document.querySelector('#stepper1'), {
  //     linear: false,
  //     animation: true
  //   })
  // }
  configurationDetails!: FormGroup;
  UdiseDetails!: FormGroup;
  stateDetails!: FormGroup;
  configuration_step = false;
  udise_step = false;
  state_step = false;
  step = 1;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.configurationDetails = this.formBuilder.group({
      fileupload: [''],
      portalName: [''],
      primaryColor: [''],
      secondaryColor: [''],
      language: [''],
      emailSetup: [''],
      storageSetup: [''],
      secretId: [''],
      email: [''],
      password: [''],
    });
    this.UdiseDetails = this.formBuilder.group({
      udiseId: [''],
      password: ['']
    });
    this.stateDetails = this.formBuilder.group({
      state: [''],
      district: [''],
      zone: [''],
      cluster: [''],
      school: [''],
    });
  }
  get configuration() { return this.configurationDetails.controls; }
  get udiseInformation() { return this.UdiseDetails.controls; }
  get stateInformation() { return this.stateDetails.controls; }
  
  next() {
    if (this.step == 1) {
      this.configuration_step = true;
      if (this.configurationDetails.invalid) { return }
      this.step=this.step+1;
      console.log(this.step)
    }
    else if (this.step == 2) {console.log("inside ")
      this.udise_step = true;console.log("after address step enabled")
      if (this.UdiseDetails.invalid) { return }
      this.step++; console.log(this.step)
    }
    else  {console.log("inside else")
      this.state_step = true;console.log("after education step enabled")
      if (this.stateDetails.invalid) { return }
      // this.step++; console.log(this.step)
    }
  }
  previous() {
    this.step--
    if (this.step == 1) {
      this.configuration_step = false;
    }
    if (this.step == 2) {
      this.udise_step = false;
    }
  }
  submit() {
    // if (this.step == 3) {
    //   this.education_step = true;
    //   if (this.educationalDetails.invalid) { return }
    // }
  }
}

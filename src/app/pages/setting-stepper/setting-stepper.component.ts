import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'assets/scss/paper-dashboard/_variables.scss'

@Component({
  selector: 'app-setting-stepper',
  templateUrl: './setting-stepper.component.html',
  styleUrls: ['./setting-stepper.component.css']
})
export class SettingStepperComponent implements OnInit {
  configurationDetails!: FormGroup;
  UdiseDetails!: FormGroup;
  stateDetails!: FormGroup;
  configuration_step = false;
  udise_step = false;
  state_step = false;
  step = 1;
  showPreview = false;

  primaryColor : string;
  secondaryColor : string;

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
  
  submit() {
   console.log("form submited")
  }
  previewHandler(){
    this.showPreview = ! this.showPreview
    if(this.showPreview){
      document.documentElement.style.setProperty('--primary',this.primaryColor );
      document.documentElement.style.setProperty('--secondary',this.secondaryColor );
    }else{
      document.documentElement.style.setProperty('--primary','#7251ce' );
      document.documentElement.style.setProperty('--secondary','green' );
    }
  }
  onColorChange(color:string, value:string){
    if(value === 'primary'){
      this.primaryColor = color
    }else if( value === 'secondary'){
      this.secondaryColor = color;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalComponent } from 'app/shared/global/global.component';
import { TopBarComponent } from 'app/shared/topbar/topbar.component';

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
  portalName :string;
  public color2: string = '#e920e9';

  constructor(
    private formBuilder: FormBuilder,
    private global : GlobalComponent, 
    private topBar : TopBarComponent) 
  { }
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
    if(this.showPreview && this.global.primaryColor && this.global.secondaryColor){
      document.documentElement.style.setProperty('--primary',this.global.primaryColor );
      document.documentElement.style.setProperty('--secondary',this.global.secondaryColor );
      this.topBar.ngOnInit(this.portalName,this.showPreview);
    }else{
      document.documentElement.style.setProperty('--primary','#7251ce' );
      document.documentElement.style.setProperty('--secondary','green' );
      this.topBar.ngOnInit(this.global.portalName,this.showPreview);
    }
  }
  onColorChange(givenValue:string, type:string){
    if(type === 'primary'){
      this.global.primaryColor = givenValue
    }else if( type === 'secondary'){
      this.global.secondaryColor = givenValue;
    }else if(type === 'portal'){
      this.portalName = givenValue;
    }
  }
}

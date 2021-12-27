import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

import { GlobalComponent } from 'app/shared/global/global.component';
import { TopBarComponent } from 'app/shared/topbar/topbar.component';
import { AdminServiceService } from 'app/services/admin-service.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-setting-stepper',
  templateUrl: './setting-stepper.component.html',
  styleUrls: ['./setting-stepper.component.css']
})
export class SettingStepperComponent implements OnInit {
  configurationDetails!: FormGroup;
  UdiseDetails!: FormGroup;
  stateDetails!: FormGroup;
  showPreview = false;
  ShowFilter = false;
  dropdownList;
  dropdownSettings;
  languageSelected: any[]=[];
  portalName :string;
  storageSelectArray= [
    { id: 1, name: "AWS" },
    { id: 2, name: "Cloud" },
  ];
  /* color picker */
  primaryColor!: string;
  secondaryColor!: string;
  stateID: any;
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';
  public cmykValue: string = '';
  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  

  constructor(
    private formBuilder: FormBuilder,
    private global : GlobalComponent, 
    private topBar : TopBarComponent,
    private cpService: ColorPickerService,
    public vcRef: ViewContainerRef,
    public adminService: AdminServiceService
    ) { }

  ngOnInit() {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'itemId',
      textField: 'Language',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',allowSearchFilter: true
    };
    this.configurationDetails = this.formBuilder.group({
      fileupload: [''],
      portalName: new FormControl(''),
      // primaryColor: [this.primaryColorChange],
      // secondaryColor: [this.secondaryColorChange],
      primaryColor: new FormControl(''),
      secondaryColor: new FormControl(''),
      emailSetup: new FormControl(''),
      storageSetup: new FormControl(''),
      secretId: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      language : new FormControl(['']),
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

    this.adminService.stateInfoFun().subscribe((res: any) => {
      this.stateID = res.responseData[0].stateId;
      this.primaryColor = res.responseData[0].primaryColor;
      this.secondaryColor = res.responseData[0].secondaryColor;
      this.configurationDetails.patchValue({
        language: [res.responseData[0].languageSetup[0]],
        portalName: res.responseData[0].portalName,
        primaryColor: res.responseData[0].primaryColor,
        secondaryColor: res.responseData[0].secondaryColor
      })
      let primaryColorSpan = document.getElementById('primaryColor');
      primaryColorSpan.style.backgroundColor = this.primaryColor;
      let secondaryColorSpan = document.getElementById('secondaryColor');
      secondaryColorSpan.style.backgroundColor = this.secondaryColor;
      
    });
    
    
  }
  
  get configuration() { return this.configurationDetails.controls; }
  get udiseInformation() { return this.UdiseDetails.controls; }
  get stateInformation() { return this.stateDetails.controls; }
  
 getData() : Array<any>{
    return [
      { abb : 'en', itemId: 1, Language: 'English' },
      { abb : 'ka', itemId: 2, Language: 'Kannada' },
      { abb : 'ta', itemId: 3, Language: 'Tamil' },
      { abb : 'V', itemId: 4, Language: 'Telugu' },
      { abb : 'Ha', itemId: 5, Language: 'Hindi' }
    ];
  }

  getObjectListFromData(ids){
    return this.getData().filter(item => ids.includes(item.itemId))
  }

  previewHandler(){
    this.showPreview = ! this.showPreview
    if(this.showPreview && this.global.primaryColor && this.global.secondaryColor){
      document.documentElement.style.setProperty('--primary',this.primaryColor);
      document.documentElement.style.setProperty('--secondary',this.secondaryColor);
      this.topBar.ngOnInit(this.portalName,this.showPreview);
    }else{
      document.documentElement.style.setProperty('--primary','#7251ce' );
      document.documentElement.style.setProperty('--secondary','green' );
      this.topBar.ngOnInit(this.global.portalName,this.showPreview);
    }
  }

  handleSubmit(form: FormGroup){
    console.log("test",form.value)
  }
  /* Color picker */

  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);
    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);
      return this.cpService.rgbaToCmyk(rgba);
    }
    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);
    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }
    return '';
  }

  configurationDetailsSubmit(form: FormGroup){ 
    var languageCode;
    // this.adminService.stateUpdateInfoFun(this.configurationDetails.value, this.stateID);
    this.languageSelected = this.getObjectListFromData(this.configurationDetails.value.language.map(item => item.itemId))
    console.log(this.languageSelected);
    console.log(this.configurationDetails.value);
  }
  
  get primaryColorChange() {
    let newColor:string;
    return newColor = this.primaryColor
  }

  get secondaryColorChange() {
    let newColor:string;
    return newColor = this.secondaryColor
  }

  updatePickerPrimaryColor(color: string): void {
    console.log(color);
    let primaryColorSpan = document.getElementById('primaryColor');
    primaryColorSpan.style.backgroundColor = color;
    this.global.primaryColor = this.primaryColor
    
    this.configurationDetails.patchValue({ 
      primaryColor: color 
    });
  }
  
  updatePickerSecondaryColor(color: string): void {
    console.log(color);
    let secondaryColorSpan = document.getElementById('secondaryColor');
    secondaryColorSpan.style.backgroundColor = color;
    this.global.secondaryColor = this.secondaryColor;
    this.configurationDetails.patchValue({ 
      secondaryColor: color 
    });
  }
}

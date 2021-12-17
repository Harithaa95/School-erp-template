import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

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
  dropdownList;
  dropdownSettings;
  languageSelected: any[]=[];
  portalName :string;

  /* color picker */
  public toggle: boolean = false;
  storageSelectArray= [
    { id: 1, name: "AWS" },
    { id: 2, name: "Cloud" },
  ];

  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  // public arrayColors: any = {
  //   color1: '#2883e9',
  //   color2: '#e920e9',
  //   color3: 'rgb(255,245,0)',
  //   color4: 'rgb(236,64,64)',
  //   color5: 'rgba(45,208,45,1)'
  // };

  // public selectedColor: string = 'color1';

  public color1: string = '#2889e9';
  public color2: string = '#e920e9';
  public color3: string = '#fff500';
  public color4: string = 'rgb(236,64,64)';
  public color5: string = 'rgba(45,208,45,1)';
  public color6: string = '#1973c0';
  public color7: string = '#f200bd';
  public color8: string = '#a8ff00';
  public color9: string = '#278ce2';
  public color10: string = '#0a6211';
  public color11: string = '#f2ff00';
  public color12: string = '#f200bd';
  public color13: string = 'rgba(0,255,0,0.5)';
  public color14: string = 'rgb(0,255,255)';
  public color15: string = 'rgb(255,0,0)';
  public color16: string = '#a51ad633';
  public color17: string = '#666666';
  public color18: string = '#ff0000';

  public cmykValue: string = '';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  

  constructor(
    private formBuilder: FormBuilder,
    private global : GlobalComponent, 
    private topBar : TopBarComponent,
    private cpService: ColorPickerService,
    public vcRef: ViewContainerRef
    ) 
  { }
  ngOnInit() {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',allowSearchFilter: true
    };
    this.configurationDetails = this.formBuilder.group({
      fileupload: [''],
      portalName: new FormControl(''),
      primaryColor: new FormControl(''),
      secondaryColor: new FormControl(''),
      emailSetup: new FormControl(''),
      storageSetup: new FormControl(''),
      secretId: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      language : [''],
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
  
 getData() : Array<any>{
    return [
      { item_id: 1, item_text: 'Hindi', abbreviation : 'Ha' },
      { item_id: 2, item_text: 'Kannada', abbreviation : 'ka' },
      { item_id: 3, item_text: 'Tamil', abbreviation : 'ta' },
      { item_id: 4, item_text: 'Telugu', abbreviation : 'V' }
    ];
  }
   onItemSelect($event){
    console.log('$event is ', $event); 
    //this.languageSelected=this.getObjectListFromData(this.form.value.language.map(item => item.item_id))
  }

  getObjectListFromData(ids){
    return this.getData().filter(item => ids.includes(item.item_id))
  }

  submit() {
    // if (this.step == 3) {
    //   this.education_step = true;
    //   if (this.educationalDetails.invalid) { return }
    // }
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
    console.log("test",form.value)
    this.languageSelected=this.getObjectListFromData(this.configurationDetails.value.language.map(item => item.item_id))
    console.log("language Selected",this.languageSelected)
    for(var i=0;i<this.languageSelected.length;i++){
      // this.languageSelected=i.
      console.log(this.languageSelected[i].abbreviation)
    }
  }
  title = 'colorPicker';
  color: string = '#2889e9'
  arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };
  selectedColor: string = 'color1';  
}

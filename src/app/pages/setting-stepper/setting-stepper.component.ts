import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { ToastrService } from 'ngx-toastr';
import { GlobalComponent } from 'app/shared/global/global.component';
import { TopBarComponent } from 'app/shared/topbar/topbar.component';


@Component({
  selector: 'app-setting-stepper',
  templateUrl: './setting-stepper.component.html',
  styleUrls: ['./setting-stepper.component.css']
})
export class SettingStepperComponent implements OnInit {
  configurationDetails!: FormGroup;
  udiseDetails!: FormGroup;
  stateDetails!: FormGroup;

  isconfigurationDetailsSubmitted=false;
  isUdiseDetailsSubmitted=false;

  showPreview = false;
  logoName = '';

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
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';
  public cmykValue: string = '';
  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  

  constructor(
    private formBuilder: FormBuilder,
    private global : GlobalComponent, 
    private topBar : TopBarComponent,
    private cpService: ColorPickerService,
    public vcRef: ViewContainerRef,
    private toastrService:ToastrService
    ) { }

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
      logo: [this.logoName, Validators.required],
      favIcon:[''],
      portalName: ['',Validators.required],
      primaryColor: [this.primaryColorChange],
      secondaryColor: [this.secondaryColorChange],
      emailSetup: [''],
      storageSetup: ['',Validators.required],
      secretId: [''],
      email: [''],
      password: [''],
      language : ['',],
    });

    this.udiseDetails = this.formBuilder.group({
      udiseId: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.stateDetails = this.formBuilder.group({
      state: [''],
      district: [''],
      zone: [''],
      cluster: [''],
      school: [''],
    });

  }
  get configurationFormControl() { return this.configurationDetails.controls; }
  get udiseInformationFormControl() { return this.udiseDetails.controls; }
  get stateInformationFormControl() { return this.stateDetails.controls; }
  
 getData() : Array<any>{
    return [
      { item_id: 1, item_text: 'Hindi', abbreviation : 'Ha' },
      { item_id: 2, item_text: 'Kannada', abbreviation : 'ka' },
      { item_id: 3, item_text: 'Tamil', abbreviation : 'ta' },
      { item_id: 4, item_text: 'Telugu', abbreviation : 'V' }
    ];
  }

  getObjectListFromData(ids){
    return this.getData().filter(item => ids.includes(item.item_id))
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

  configurationDetailsSubmit(formValue: FormGroup){ 
    this.isconfigurationDetailsSubmitted=true;
    var languageCode;
    console.log(this.configurationDetails.valid)
    if (this.configurationDetails.valid) {
        console.log(formValue.value);
        // this.languageSelected=this.getObjectListFromData(this.configurationDetails.value.language.map(item => item.item_id))
    }
  }


  udiseDetailsSubmit(udiseFormValue:any){
    this.isUdiseDetailsSubmitted=true
    console.log(this.udiseDetails.valid)
    if (this.udiseDetails.valid) {
        console.log(udiseFormValue.value);
        console.log(this.udiseDetails);
        this.toastrService.success('Data Inserted Successfully!','',{
          timeOut:2000,
          positionClass:'toast-top-left'
        })

    }
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
    this.primaryColor = color;
    this.global.primaryColor = this.primaryColor
    this.configurationDetails.patchValue({ color });
  }
  
  updatePickerSecondaryColor(color: string): void {
    this.secondaryColor = color;
    this.global.secondaryColor = this.secondaryColor;
    this.configurationDetails.patchValue({ color });
  }

  keyDown(event:any){
    return false;
  }


  onLogoFileChange($event){
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.configurationDetails.controls['logo'].setValue(file ? file.name : '');
  }

  
}

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
  dropdownList;
  dropdownSettings;
  languageSelected: any[]=[];
  storageSelectArray= [
    { id: 1, name: "AWS" },
    { id: 2, name: "Cloud" },
  ];

  portalName :string;
  public color2: string = '#e920e9';

  constructor(
    private formBuilder: FormBuilder,
    private global : GlobalComponent, 
    private topBar : TopBarComponent) 
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
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


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
  form!: FormGroup;
  languageSelected: any[]=[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
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
  
 getData() : Array<any>{
    return [
      { item_id: 1, item_text: 'Hindi', group : 'F' },
      { item_id: 2, item_text: 'Kannada', group : 'F' },
      { item_id: 3, item_text: 'Tamil', group : 'V' },
      { item_id: 4, item_text: 'Telugu', group : 'V' },
      { item_id: 5, item_text: 'Hindi', group : 'V' }
    ];
  }
   onItemSelect($event){
    console.log('$event is ', $event); 
  }

  initForm(){
    this.form = this.formBuilder.group({
      language : ['',[Validators.required]]
    })

  }
  getObjectListFromData(ids){
    return this.getData().filter(item => ids.includes(item.item_id))
  }

  handleButtonClick(){
    console.log('reactive form value ', this.form.value);
     console.log('Actual data ', this.getObjectListFromData(this.form.value.language.map(item => item.item_id)));
     this.languageSelected=this.getObjectListFromData(this.form.value.language.map(item => item.item_id))
     console.log(this.languageSelected)
  }
  submit() {
    // if (this.step == 3) {
    //   this.education_step = true;
    //   if (this.educationalDetails.invalid) { return }
    // }
  }
  previewHandler(){
    this.showPreview = ! this.showPreview
    console.log(this.showPreview)
  }
  
}

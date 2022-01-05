import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ColorPickerService, Cmyk } from "ngx-color-picker";
import { ToastrService } from "ngx-toastr";
import { GlobalComponent } from "app/shared/global/global.component";
import { TopBarComponent } from "app/shared/topbar/topbar.component";
import { AdminServiceService } from "app/services/admin-service.service";
import { Router } from '@angular/router';

export interface Breadcrumb {
  name: string;
  url: string;
  queryParams?: any;
  pauseDisplay?: boolean;
}

@Component({
  selector: "app-setting-stepper",
  templateUrl: "./setting-stepper.component.html",
  styleUrls: ["./setting-stepper.component.css"],
})

export class SettingStepperComponent implements OnInit {
  configurationDetails!: FormGroup;
  udiseDetails!: FormGroup;
  stateDetails!: FormGroup;
  storageSetupDetails!: FormGroup;

  isconfigurationDetailsSubmitted = false;
  isUdiseDetailsSubmitted = false;
  isStorageDetailsSubmitted = false;

  showPreview = false;

  logoName = "";
  ShowFilter = false;

  dropdownList;
  dropdownSettings;

  token: string = '';

  languageSelected: any[] = [];

  portalName: string;

  storageSelectArray = [
    { id: 1, name: "AWS" },
    { id: 2, name: "Cloud" },
  ];

  /* color picker */
  primaryColor!: string;
  secondaryColor!: string;
  stateID: any;
  public rgbaText: string = "rgba(165, 26, 214, 0.2)";
  public cmykValue: string = "";
  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

  constructor(
    private formBuilder: FormBuilder,
    private global: GlobalComponent,
    private topBar: TopBarComponent,
    private cpService: ColorPickerService,
    public vcRef: ViewContainerRef,
    private toastrService: ToastrService,
    public adminService: AdminServiceService,
    public router: Router
  ) { }

  ngOnInit() {
    this.dropdownList = this.getData();
    this.token = sessionStorage.getItem('token');
    this.dropdownSettings = {
      singleSelection: false,
      idField: "itemId",
      textField: "Language",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      allowSearchFilter: true,
    };

    this.configurationDetails = this.formBuilder.group({
      logo: [this.logoName, Validators.required],
      favIcon: [""],
      portalName: ["", Validators.required],
      primaryColor: new FormControl(""),
      secondaryColor: new FormControl(""),
      emailSetup: new FormControl(""),
      secretId: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      language: new FormControl([""]),
    });

    this.udiseDetails = this.formBuilder.group({
      udiseId: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.stateDetails = this.formBuilder.group({
      state: [""],
      district: [""],
      zone: [""],
      cluster: [""],
      school: [""],
    });

    this.storageSetupDetails = this.formBuilder.group({
      storageSetup: ["", Validators.required],
    });
    this.adminService.stateInfoFun(this.token).subscribe((res: any) => {
      this.stateID = res.responseData[0].stateId;
      this.primaryColor = res.responseData[0].primaryColor;
      this.secondaryColor = res.responseData[0].secondaryColor;
      this.configurationDetails.patchValue({
        language: [res.responseData[0].languageSetup[0]],
        portalName: res.responseData[0].portalName,
        primaryColor: res.responseData[0].primaryColor,
        secondaryColor: res.responseData[0].secondaryColor,
      });
      let primaryColorSpan = document.getElementById("primaryColor");
      primaryColorSpan.style.backgroundColor = this.primaryColor;
      let secondaryColorSpan = document.getElementById("secondaryColor");
      secondaryColorSpan.style.backgroundColor = this.secondaryColor;
    });
  }
  get configurationFormControl() {
    return this.configurationDetails.controls;
  }
  get udiseInformationFormControl() {
    return this.udiseDetails.controls;
  }
  get stateInformationFormControl() {
    return this.stateDetails.controls;
  }

  get storageSetupFormControl() {
    return this.storageSetupDetails.controls;
  }

  getData(): Array<any> {
    return [
      { abb: "en", itemId: 1, Language: "English" },
      { abb: "ka", itemId: 2, Language: "Kannada" },
      { abb: "ta", itemId: 3, Language: "Tamil" },
      { abb: "V", itemId: 4, Language: "Telugu" },
      { abb: "Ha", itemId: 5, Language: "Hindi" },
    ];
  }

  getObjectListFromData(ids) {
    return this.getData().filter((item) => ids.includes(item.itemId));
  }

  previewHandler() {
    this.showPreview = !this.showPreview;
    if (
      this.showPreview &&
      this.global.primaryColor &&
      this.global.secondaryColor
    ) {
      document.documentElement.style.setProperty(
        "--primary",
        this.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondary",
        this.secondaryColor
      );
      this.topBar.ngOnInit(this.portalName, this.showPreview);
    } else {
      document.documentElement.style.setProperty("--primary", "#7251ce");
      document.documentElement.style.setProperty("--secondary", "green");
      this.topBar.ngOnInit(this.global.portalName, this.showPreview);
    }
  }

  handleSubmit(form: FormGroup) {
    console.log("test", form.value);
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
      return this.cpService.outputFormat(hsva, "rgba", null);
    }
    return "";
  }

  configurationDetailsSubmit(formValue: FormGroup) {
    this.isconfigurationDetailsSubmitted = true;
    var languageCode;
    console.log(this.configurationDetails.valid);
    if (this.configurationDetails.valid) {
      console.log(formValue.value);
      // this.languageSelected=this.getObjectListFromData(this.configurationDetails.value.language.map(item => item.item_id)
      this.languageSelected = this.getObjectListFromData(
        this.configurationDetails.value.language.map((item) => item.itemId)
      );
      console.log(this.languageSelected);
      this.configurationDetails.value.language = this.languageSelected;
      console.log(this.configurationDetails.value);
      this.adminService.stateUpdateInfoFun(
        this.configurationDetails.value,
        this.stateID,
        this.token
      );
    }
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

  StorageDetailsSubmit(storageSetupValue: any) {
    this.isStorageDetailsSubmitted = true;
    console.log(this.storageSetupDetails.valid);
    if (this.udiseDetails.valid) {
      console.log(storageSetupValue.value);
      console.log(this.storageSetupDetails);
      this.toastrService.success("Data Inserted Successfully!", "", {
        timeOut: 2000,
      });
    }
  }

  get primaryColorChange() {
    let newColor: string;
    return (newColor = this.primaryColor);
  }

  get secondaryColorChange() {
    let newColor: string;
    return (newColor = this.secondaryColor);
  }

  updatePickerPrimaryColor(color: string): void {
    console.log(color);
    let primaryColorSpan = document.getElementById("primaryColor");
    primaryColorSpan.style.backgroundColor = color;
    this.global.primaryColor = this.primaryColor;

    this.configurationDetails.patchValue({
      primaryColor: color,
    });
  }

  updatePickerSecondaryColor(color: string): void {
    console.log(color);
    let secondaryColorSpan = document.getElementById("secondaryColor");
    secondaryColorSpan.style.backgroundColor = color;
    this.global.secondaryColor = this.secondaryColor;
    this.configurationDetails.patchValue({
      secondaryColor: color,
    });
  }

  keyDown(event: any) {
    return false;
  }

  onLogoFileChange($event) {
    let file = $event.target.files[0]; // <--- File Object for future use.
    this.configurationDetails.controls["logo"].setValue(file ? file.name : "");
  }


}


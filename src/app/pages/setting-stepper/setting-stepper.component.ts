import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ColorPickerService, Cmyk } from "ngx-color-picker";
import { ToastrService } from "ngx-toastr";
import { GlobalComponent } from "app/shared/global/global.component";
import { TopBarComponent } from "app/shared/topbar/topbar.component";
import { AdminServiceService } from "app/services/admin-service.service";

@Component({
  selector: "app-setting-stepper",
  templateUrl: "./setting-stepper.component.html",
  styleUrls: ["./setting-stepper.component.css"],
})
export class SettingStepperComponent implements OnInit {

  @ViewChild("imageSize") inputLogo: any;
  @ViewChild("imagefavIcon") inputImg: any;

  configurationDetails!: FormGroup;
  udiseDetails!: FormGroup;
  stateDetails!: FormGroup;

  loadingLogo: boolean = false;
  loadingFavIcon: boolean = false;

  isconfigurationDetailsSubmitted = false;
  isUdiseDetailsSubmitted = false;
  warningAlertForLogoSize = false;
  warningAlertForFavIconSize = false;
  warningAlertForLogoFormat = false;
  warningAlertForFavIconFormat = false;

  showPreview = false;

  ShowFilter = false;

  warningAlertForChooseFile: boolean = false;

  fileNameForAlert: string = "";

  warningAlert: boolean = false;

  favIconwarningAlert: boolean = false;

  imageError: string;

  isImageSaved: boolean;

  cardImageBase64: string;

  attachmentLogoDetails: any[] = [];

  attachmentFaviconDetails: any[] = [];

  logofileUrl: any[] = [];
  faviconfileUrl: any[] = [];

  selectedFiles!: FileList;

  dropdownList;
  dropdownSettings;

  token: string = "";
  titleName: string = "";

  languageSelected: any[] = [];

  portalName: any;

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
    private toastrService: ToastrService,
    public adminService: AdminServiceService
  ) {}

  ngOnInit() {
    this.dropdownList = this.getData();
    this.token = sessionStorage.getItem("token");
    this.dropdownSettings = {
      singleSelection: false,
      idField: "itemId",
      textField: "Language",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      allowSearchFilter: true,
    };

    this.configurationDetails = this.formBuilder.group({
      logo: [""],
      favIcon: [""],
      portalName: ["", Validators.required],
      primaryColor: new FormControl(""),
      secondaryColor: new FormControl(""),
      emailSetup: new FormControl(""),
      storageSetup: new FormControl(""),
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
    this.adminService.stateInfoFun(this.token).subscribe((res: any) => {
      this.stateID = res.responseData[0].stateId;
      this.primaryColor = res.responseData[0].primaryColor;
      this.secondaryColor = res.responseData[0].secondaryColor;
      this.titleName = res.responseData[0].portalName;
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
      document.documentElement.style.setProperty("--primary", res.responseData[0].primaryColor);
      document.documentElement.style.setProperty("--secondary",res.responseData[0].secondaryColor);
    });
  }

  get configurationFormControl() { return this.configurationDetails.controls; }
  get udiseInformationFormControl() { return this.udiseDetails.controls; }
  get stateInformationFormControl() { return this.stateDetails.controls; }

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
    if (this.showPreview && this.global.primaryColor && this.global.secondaryColor) {
      document.documentElement.style.setProperty("--primary", this.primaryColor);
      document.documentElement.style.setProperty("--secondary",this.secondaryColor);
      if (this.logofileUrl.length !== 0) {
        this.topBar.logo(this.logofileUrl[0]);
      }
      if (this.faviconfileUrl.length !== 0) {
        this.topBar.favicon(this.faviconfileUrl[0]);
      }
      if(this.titleName !== null) {
        this.topBar.portal(this.titleName);
      }
    } else {
      this.adminService.stateInfoFun(this.token).subscribe((res: any) => {
        this.primaryColor = res.responseData[0].primaryColor;
        this.secondaryColor = res.responseData[0].secondaryColor;
        let primaryColorSpan = document.getElementById("primaryColor");
        primaryColorSpan.style.backgroundColor = this.primaryColor;
        let secondaryColorSpan = document.getElementById("secondaryColor");
        secondaryColorSpan.style.backgroundColor = this.secondaryColor;
        document.documentElement.style.setProperty("--primary", this.primaryColor);
        document.documentElement.style.setProperty("--secondary", this.secondaryColor);
        this.inputImg.nativeElement.value = null;
        this.inputLogo.nativeElement.value = null;
        this.topBar.portal(res.responseData[0].portalName);
        this.configurationDetails.patchValue({
          language: [res.responseData[0].languageSetup[0]],
          portalName: res.responseData[0].portalName,
          primaryColor: res.responseData[0].primaryColor,
          secondaryColor: res.responseData[0].secondaryColor,
        });
        this.topBar.logo("assets/img/pudhuchery_gov.png");
        this.topBar.favicon("./assets/img/favicon.png");
      })
    }
  }

  ontitleChange(titleValue: any) {
    return this.titleName = titleValue;
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
        this.stateID
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
        positionClass: "toast-top-left",
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
    let primaryColorSpan = document.getElementById("primaryColor");
    primaryColorSpan.style.backgroundColor = color;
    this.global.primaryColor = this.primaryColor;

    this.configurationDetails.patchValue({
      primaryColor: color,
    });
  }

  updatePickerSecondaryColor(color: string): void {
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
    this.loadingLogo = true;
    this.attachmentLogoDetails = [];
    let file = $event.target.files[0]; // <--- File Object for future use.
    if(file.type !== "image/jpeg" || file.type !== "image/png") {
      this.loadingLogo = false;
      this.warningAlertForLogoFormat = true;
      this.inputLogo.nativeElement.value = null;
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      let image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        let height = image.naturalHeight;
        let width = image.naturalWidth;

        if (height > 100 || width > 100) {
          console.log("entered");
          this.warningAlertForLogoSize = true;
          this.loadingLogo = false;
          this.inputLogo.nativeElement.value = null;
        } else {
          this.warningAlertForLogoSize = false;
          if (file.size > 1024 * 1000) {
            console.log("entered");
            this.loadingLogo = false;
            this.warningAlert = true;
            this.inputLogo.nativeElement.value = null;
          } else {
            console.log("entered");
            this.warningAlert = false;
            this.adminService.uploadFileFun(file, this.token).subscribe(
              async (event) => {
                let fileName = event.responseData.FileName;
                let folderName = event.responseData.folderName;
                let arrayObject = {
                  fileName: event.responseData.FileName,
                  folderName: event.responseData.folderName,
                };
                this.attachmentLogoDetails.push(arrayObject);
                this.adminService.uploadUrl(file, event.responseData.url).subscribe((event) => {
                      this.adminService.downloadFileFun(fileName, folderName, this.token).subscribe((data) => {
                          this.loadingLogo = false;
                          this.logofileUrl.push(data.responseData);
                      });
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      };
    };
  }

  onFaviconFileChange($event) {
    this.loadingFavIcon = true;
    this.attachmentFaviconDetails = [];
    let file = $event.target.files[0];
    if(file.type !== "image/jpeg" && file.type !== "image/png") {
      this.loadingFavIcon = false;
      this.warningAlertForFavIconFormat = true;
      this.inputImg.nativeElement.value = null;
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      let image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        let height = image.naturalHeight;
        let width = image.naturalWidth;

        if (height > 100 || width > 100) {
          this.warningAlertForFavIconSize = true;
          this.loadingFavIcon = false;
          this.inputImg.nativeElement.value = null;
        } else {
          this.warningAlertForFavIconSize = false;
          if (file.size > 1024 * 1000) {
            this.loadingFavIcon = false;
            this.favIconwarningAlert = true;
            this.inputImg.nativeElement.value = null;
          } else {
            this.warningAlert = false;
            this.adminService.uploadFileFun(file, this.token).subscribe(
              async (event) => {
                let fileName = event.responseData.FileName;
                let folderName = event.responseData.folderName;
                let arrayObject = {
                  fileName: event.responseData.FileName,
                  folderName: event.responseData.folderName,
                };
                this.attachmentFaviconDetails.push(arrayObject);
                this.adminService.uploadUrl(file, event.responseData.url).subscribe((event) => {
                  this.adminService.downloadFileFun(fileName, folderName, this.token).subscribe((data) => {
                    this.loadingFavIcon = false;
                    this.faviconfileUrl.push(data.responseData);
                  });
                },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      };
    };
  }
}

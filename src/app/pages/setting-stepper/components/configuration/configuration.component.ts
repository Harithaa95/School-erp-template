import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from 'app/services/admin-service.service';
import { GlobalComponent } from 'app/shared/global/global.component';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { TopBarComponent } from 'app/shared/topbar/topbar.component';

import { ColorPickerService, Cmyk } from "ngx-color-picker";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  @ViewChild("imageSize") inputLogo: any;
  @ViewChild("imagefavIcon") inputImg: any;

  configurationDetails: FormGroup;

  isconfigurationDetailsSubmitted: boolean = false;

  token: any;
  stateID: any;
  primaryColor: any;
  secondaryColor: any;
  titleName: any;

  languageSelected: any[] = [];

  showPreview = false;

  loading = false;

  warningAlert: boolean = false;

  favIconwarningAlert: boolean = false;

  loadingLogo: boolean = false;
  loadingFavIcon: boolean = false;

  isUdiseDetailsSubmitted = false;
  isStorageDetailsSubmitted = false;
  warningAlertForLogoSize = false;
  warningAlertForFavIconSize = false;
  warningAlertForLogoFormat = false;
  warningAlertForFavIconFormat = false;

  logofileUrl: any[] = [];
  faviconfileUrl: any[] = [];

  attachmentLogoDetails: any[] = [];
  attachmentFaviconDetails: any[] = [];

  dropdownList;
  dropdownSettings;

  constructor( 
    public router: Router,
    private global: GlobalComponent,
    private topBar: TopBarComponent,
    private navBar: NavbarComponent,
    public adminService: AdminServiceService,
    private cpService: ColorPickerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

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

    this.token = sessionStorage.getItem('token');

    this.configurationDetails = this.formBuilder.group({
      logo: [""],
      favIcon: [""],
      portalName: ["", Validators.required],
      primaryColor: new FormControl(""),
      secondaryColor: new FormControl(""),
      emailSetup: new FormControl(""),
      secretId: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      languageSetup: new FormControl([""]),
    });

    this.adminService.stateInfoFun(this.token).subscribe((res: any) => {
      this.stateID = res.responseData[0].stateId;
      this.primaryColor = res.responseData[0].primaryColor;
      this.secondaryColor = res.responseData[0].secondaryColor;
      this.titleName = res.responseData[0].portalName;
      this.configurationDetails.patchValue({
        languageSetup: res.responseData[0].languageSetup,
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
      this.topBar.logo(res.responseData[0].logo);
    });
  }

  get configurationFormControl() { return this.configurationDetails.controls; }

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
          languageSetup: res.responseData[0].languageSetup,
          portalName: res.responseData[0].portalName,
          primaryColor: res.responseData[0].primaryColor,
          secondaryColor: res.responseData[0].secondaryColor,
        });
        this.topBar.logo("assets/img/pudhuchery_gov.png");
        this.topBar.favicon("./assets/img/favicon.png");
      })
    }
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

  configurationDetailsSubmit(formValue: FormGroup) {
    this.loading = true;
    this.isconfigurationDetailsSubmitted = true;
    if (this.configurationDetails.valid) {
      this.configurationDetails.value.logo = this.logofileUrl[0];
      this.configurationDetails.value.favIcon = this.faviconfileUrl[0];
      this.languageSelected = this.getObjectListFromData(
        this.configurationDetails.value.languageSetup.map((item) => item.itemId)
      );
      this.configurationDetails.value.language = this.languageSelected;
      this.adminService.stateUpdateInfoFun(
        this.configurationDetails.value,
        this.stateID,
        this.token
      );
      this.configurationDetails.value.languageSetup = this.languageSelected;
      this.adminService.stateUpdateInfoFun(this.configurationDetails.value,this.stateID, this.token).subscribe((res: any) => {
        this.loading = false;
        if(res.result === "Success") {
          this.toastrService.success(res.responseData);
          this.adminService.stateInfoFun(this.token).subscribe((res: any) => {
            // this.navBar.selectedLanguageFun(this.languageSelected);
            this.navBar.reloadComponent();
            this.languageSelected = res.responseData[0].languageSetup;
            this.configurationDetails.patchValue({
              languageSetup: res.responseData[0].languageSetup,
              portalName: res.responseData[0].portalName,
              primaryColor: res.responseData[0].primaryColor,
              secondaryColor: res.responseData[0].secondaryColor,
            });
            this.stateID = res.responseData[0].stateId;
            this.primaryColor = res.responseData[0].primaryColor;
            this.secondaryColor = res.responseData[0].secondaryColor;
            this.titleName = res.responseData[0].portalName;
            let primaryColorSpan = document.getElementById("primaryColor");
            primaryColorSpan.style.backgroundColor = this.primaryColor;
            let secondaryColorSpan = document.getElementById("secondaryColor");
            secondaryColorSpan.style.backgroundColor = this.secondaryColor;
            document.documentElement.style.setProperty("--primary", res.responseData[0].primaryColor);
            document.documentElement.style.setProperty("--secondary",res.responseData[0].secondaryColor);
            this.topBar.logo(res.responseData[0].logo);
          });
        }
      }), (error: any) => {
        this.toastrService.error(error.message);
        console.log(error);
      };
    }
  }

  onLogoFileChange($event) {
    this.warningAlertForLogoFormat = false;
    this.warningAlertForLogoSize = false;
    this.loadingLogo = true;
    this.attachmentLogoDetails = [];
    let file = $event.target.files[0]; // <--- File Object for future use.
    if(file.type !== "image/jpeg" && file.type !== "image/png") {
      this.loadingLogo = false;
      this.warningAlertForLogoFormat = true;
      this.inputLogo.nativeElement.value = null;
      return;
    }
    this.warningAlertForLogoFormat = false;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      let image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        let height = image.naturalHeight;
        let width = image.naturalWidth;

        if (file.size > 1024 * 1000) {
          this.loadingLogo = false;
          this.warningAlert = true;
          this.inputLogo.nativeElement.value = null;
        } else {
          this.warningAlertForLogoSize = false;
          if (height > 100 || width > 100) {
            this.warningAlertForLogoSize = true;
            this.loadingLogo = false;
            this.inputLogo.nativeElement.value = null;
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
    this.warningAlertForFavIconFormat = false;
    this.warningAlertForFavIconSize = false;
    this.loadingFavIcon = true;
    this.attachmentFaviconDetails = [];
    let file = $event.target.files[0];
    if(file.type !== "image/jpeg" && file.type !== "image/png") {
      this.loadingFavIcon = false;
      this.warningAlertForFavIconFormat = true;
      this.inputImg.nativeElement.value = null;
      return;
    }
    this.warningAlertForFavIconFormat = false;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      let image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        let height = image.naturalHeight;
        let width = image.naturalWidth;

        if (file.size > 1024 * 1000) {
          this.loadingFavIcon = false;
          this.favIconwarningAlert = true;
          this.inputImg.nativeElement.value = null;
        } else {
          this.warningAlertForFavIconSize = false;
          if (height > 100 || width > 100) {
            this.warningAlertForFavIconSize = true;
            this.loadingFavIcon = false;
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

  backfunc(){
    this.router.navigate(['/settingStepper']);
  }

}

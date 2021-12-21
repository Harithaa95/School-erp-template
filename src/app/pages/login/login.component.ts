import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['../../layouts/Auth-layout/auth-layout.component.scss']
})

export class LoginComponent implements OnInit {
    LoginDetails!: FormGroup;
    message="komathi123";
    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.LoginDetails = this.formBuilder.group({
            userName: new FormControl(''),
            mailId: new FormControl(''),
            password: new FormControl(''),
        });
    }

    get formControl() {
        return this.LoginDetails.controls;
      }
    loginSubmitData(formData: any) {
        console.log(formData.value.password);
        // const encryptedPassword=CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(formData.value.password), 'my pass phrase');
        // const encryptedPassword=CryptoJS.AES.encrypt(formData.value.password.trim()).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(formData.value.password.trim(),"secretPassword").toString();

        console.log("Encrypted password",encryptedPassword)


    }
}

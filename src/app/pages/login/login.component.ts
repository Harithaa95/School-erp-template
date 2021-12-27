import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { CustomValidatorService } from '../validators/custom-validator.service';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['../../layouts/Auth-layout/auth-layout.component.scss']
})

export class LoginComponent implements OnInit {

    loginDetails!: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,private customValidatorService:CustomValidatorService
    ) { }

    ngOnInit() {
        // this.loginDetails = this.formBuilder.group({
        //     email:['',[Validators.required, Validators.email]],
        //     password: ['',Validators.compose([Validators.required, this.customValidatorService.patternValidator()])],
        // });
        this.loginDetails = this.formBuilder.group({
            email:['',Validators.required],
            password: ['',Validators.required],
        });
    }

    get loginDetailsformControl() {
        return this.loginDetails.controls;
      }

    loginSubmitData(formData: any) {
        this.submitted = true;
        console.log(this.loginDetails.valid)
        if (this.loginDetails.valid) {
            console.table(this.loginDetails.value);
            console.log(formData.value.password);
            const encryptedPassword = CryptoJS.AES.encrypt(formData.value.password.trim(),"secretPassword").toString();
            console.log("Encrypted password",encryptedPassword)
    
        }

    }
}

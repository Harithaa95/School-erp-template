import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { CustomValidatorService } from '../validators/custom-validator.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { environment } from 'environments/environment';


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
        private formBuilder: FormBuilder,private customValidatorService:CustomValidatorService,private adminService: AdminServiceService, public router: Router
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
           this.adminService.loginRequest(formData.value.email, encryptedPassword).subscribe((data) => { 
            if(data.result === 'Success'){sessionStorage.setItem("token",data.responseData);
            this.adminService.extractTokenFun(data.responseData).subscribe((data: any) => {
                if(data.responseData.userRole[0] !== "superAdmin") {
                    this.loading = false;
                    sessionStorage.removeItem('token');
                    this.router.navigate(['/login']);
                } else {
                    this.loading = false;
                    this.adminService.stateInfoFun().subscribe((res: any) => {
                        
                    });
                    this.router.navigateByUrl('/dashboard');
                }
            })
        }
        })
    
        }
}

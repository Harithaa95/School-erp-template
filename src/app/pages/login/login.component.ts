import { Component, OnInit } from '@angular/core';
import { CustomValidatorService } from '../validators/custom-validator.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['../../layouts/Auth-layout/auth-layout.component.scss']
})

export class LoginComponent implements OnInit {
    loginDetails!: FormGroup;
    submitted = false;

    loading: boolean = false;

    token: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private customValidatorService:CustomValidatorService,
        private adminService: AdminServiceService, 
        public router: Router
    ) { }

    ngOnInit() {
        this.loginDetails = this.formBuilder.group({
            email:['',Validators.required],
            password: ['',Validators.required],
        });
    }

    get loginDetailsformControl() {
        return this.loginDetails.controls;
    }

    loginSubmitData() {
        this.submitted = true;
        this.loading = true;
        if (this.loginDetails.valid) {
            const encryptedPassword = CryptoJS.AES.encrypt(this.loginDetails.value.password.trim(),"4hBY1ey_9xeCHGV4RcAgfXdadf1UkwYIyV8SawceQ2W-9t4XhcMCG5pbDu8_taP-Xx-dDQa-PK54G-qL8oKpXQ").toString();
            this.adminService.loginRequest(this.loginDetails.value.email, encryptedPassword).subscribe((data) => { 
                if(data.result === 'Success'){sessionStorage.setItem("token",data.responseData);
                    this.adminService.extractTokenFun(data.responseData).subscribe((data: any) => {
                        if(data.responseData.userRole[0] !== "superAdmin") {
                            this.loading = false;
                            sessionStorage.removeItem('token');
                            this.router.navigate(['/login']);
                        } else {
                            this.token = sessionStorage.getItem('token');
                            this.loading = false;
                            this.adminService.stateInfoFun(this.token).subscribe((res: any) => {

                            });
                            this.router.navigateByUrl('/dashboard');
                        }
                    })
                }
            })
        }
    
    }
}

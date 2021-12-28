import { Component, OnInit } from '@angular/core';
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

    loading: boolean = false;
    
    loginDetails!: FormGroup;
    constructor(
        private formBuilder: FormBuilder, private adminService: AdminServiceService, public router: Router
    ) { }

    ngOnInit() {
        this.loginDetails = this.formBuilder.group({
            mailId: new FormControl(''),
            password: new FormControl(''),
        });
    }

    get formControl() {
        return this.loginDetails.controls;
    }

    loginSubmitData(formData: any) {
        this.loading = true;
        const encryptedPassword = CryptoJS.AES.encrypt(formData.value.password.trim(), "4hBY1ey_9xeCHGV4RcAgfXdadf1UkwYIyV8SawceQ2W-9t4XhcMCG5pbDu8_taP-Xx-dDQa-PK54G-qL8oKpXQ").toString();
        this.adminService.loginRequest(formData.value.mailId, encryptedPassword).subscribe((data) => { 
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  

  constructor(public http: HttpClient,
              public router: Router) { }

  loginRequest(userId: any,userPassword:any): Observable<any> {
    // console.log(userId,userPassword);
    return this.http.post(environment.loginURL, {
      "userID": userId,
      "password": userPassword
    });
  }

  logoutRequest() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  extractTokenFun(tokenValue: any) {
    // console.log(tokenValue);
    // let headers = new HttpHeaders().set('token', tokenValue);
    return this.http.post(environment.extarctTokenURL, {} ,{ headers: new HttpHeaders({
      'token': `${tokenValue}`
    }) });
  }

}

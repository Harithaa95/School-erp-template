import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  

  constructor(public http: HttpClient) { }

  loginRequest(userId: any,userPassword:any): Observable<any> {
    // console.log(userId,userPassword);
    return this.http.post(environment.loginURL, {
      "userID": userId,
      "password": userPassword
    });
  }

  extractTokenFun(tokenValue: any) {
    // console.log(tokenValue);
    // let headers = new HttpHeaders().set('token', tokenValue);
    return this.http.post(environment.extarctTokenURL, {} ,{ headers: new HttpHeaders({
      'token': `${tokenValue}`
    }) });
  }

}

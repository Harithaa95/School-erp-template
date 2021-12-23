import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  backendURL = 'http://ed37-103-224-35-211.ngrok.io';

  constructor(public http: HttpClient) { }

  loginRequest(userId: any,userPassword:any): Observable<any> {
    console.log(userId,userPassword);
    return this.http.post(`${this.backendURL}/v1/login`, {
      "userID": userId,
      "password": userPassword
    });
  }

}

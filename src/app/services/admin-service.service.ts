import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

  

  constructor(public http: HttpClient,
              public router: Router,
              private titleService: Title) { }

  loginRequest(userId: any,userPassword:any): Observable<any> {
    return this.http.post(environment.loginURL, {
      "userID": userId,
      "password": userPassword
    });
  }

  logoutRequest() {
    sessionStorage.removeItem('token');
    document.documentElement.style.setProperty("--primary", "#7251ce");
    document.documentElement.style.setProperty("--secondary", "green");
    this.titleService.setTitle('School ERP');
    this.router.navigate(['/login']);
  }

  extractTokenFun(tokenValue: any) {
    return this.http.post(environment.extarctTokenURL, {} ,{ headers: new HttpHeaders({
      'token': `${tokenValue}`
    }) });
  }

  stateInfoFun(tokenValue: any){
    return this.http.get(environment.stateInfoURL ,{ headers: new HttpHeaders({
      'token': `${tokenValue}`
    }) });
  }

  stateUpdateInfoFun(formData: any, id: any) {
    return this.http.put(environment.stateUpdateInfoURL, {
      "stateID": id,
      "updateData" : { formData }
    })
  }

}

  uploadFileFun(imageFile: any, tokenValue: any): Observable<any> {
    return this.http.post(environment.uploadLogoURL, {
      "folderName": `${Math.floor(Date.now() / 1000)+ "Logo"}`,
      "fileName": imageFile.name,
      "expireLimt": 240,
      "extension": imageFile.type
    }, { headers: new HttpHeaders({
      'token': `${tokenValue}`
    })});
  }

  uploadUrl(fileData: any, mainUrl: any): Observable<any> {
    return this.http.put(mainUrl, fileData, { headers: { "Content-Type": "multipart/formData" } })
  }

  downloadFileFun(fileName: any, folderName: any, tokenValue: any): Observable<any>  {
    return this.http.post(environment.downloadLogoURL, {
      "FileName": fileName,
      "folderName": folderName,
      "expireLimt": 240
    }, { headers: new HttpHeaders({
      'token': `${tokenValue}`
    })});
  }

}


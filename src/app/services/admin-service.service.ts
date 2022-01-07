import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "environments/environment";
import { Router } from "@angular/router";

import { Title } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AdminServiceService {
  errorMsg: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private toastrService: ToastrService,
    private titleService: Title
  ) {}

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  loginRequest(userId: any, userPassword: any): Observable<any> {
    return this.http
      .post(environment.loginURL, {
        userID: userId,
        password: userPassword,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  logoutRequest() {
    sessionStorage.removeItem("token");
    document.documentElement.style.setProperty("--primary", "#7251ce");
    document.documentElement.style.setProperty("--secondary", "green");
    this.titleService.setTitle("School ERP");
    this.router.navigate(["/login"]);
  }

  extractTokenFun(tokenValue: any) {
    return this.http
      .post(
        environment.extarctTokenURL,
        {},
        {
          headers: new HttpHeaders({
            token: `${tokenValue}`,
          }),
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  stateInfoFun(tokenValue: any) {
    return this.http
      .get(environment.stateInfoURL, {
        headers: new HttpHeaders({
          token: `${tokenValue}`,
        }),
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  stateUpdateInfoFun(formData: any, id: any, tokenValue: any) {
    return this.http
      .put(
        environment.stateUpdateInfoURL,
        {
          stateID: id,
          updateData: formData,
        },
        {
          headers: new HttpHeaders({
            token: `${tokenValue}`,
          }),
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  uploadFileFun(imageFile: any, tokenValue: any): Observable<any> {
    return this.http
      .post(
        environment.uploadLogoURL,
        {
          folderName: `${Math.floor(Date.now() / 1000) + "Logo"}`,
          fileName: imageFile.name,
          expireLimt: 240,
          extension: imageFile.type,
        },
        {
          headers: new HttpHeaders({
            token: `${tokenValue}`,
          }),
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  uploadUrl(fileData: any, mainUrl: any): Observable<any> {
    return this.http
      .put(mainUrl, fileData, {
        headers: { "Content-Type": "multipart/formData" },
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  downloadFileFun(fileName: any, folderName: any, tokenValue: any): Observable<any> {
    return this.http
      .post(
        environment.downloadLogoURL,
        {
          FileName: fileName,
          folderName: folderName,
          expireLimt: 604800,
        },
        {
          headers: new HttpHeaders({
            token: `${tokenValue}`,
          }),
        }
      )
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error) {
            this.errorMsg = `Error: ${error.message}`;
            this.toastrService.error(this.errorMsg);
            this.router.navigateByUrl("/login");
            this.reloadComponent();
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
        })
      );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}


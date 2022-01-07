import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { AdminServiceService } from './admin-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

describe('AdminServiceService', () => {
  let adminService: AdminServiceService;
  let http:HttpClient;
  let httpController:HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    adminService = TestBed.inject(AdminServiceService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('login service should be created', () => {
    expect(adminService).toBeTruthy();
  });

  it('call loginSubmitDetails()', () => {
    const testData = true;
    const inputData = {
      email: 'admin',
      password: 'admin',
    };
    adminService
      .loginRequest(inputData.email,inputData.password)
      .subscribe((data) => expect(data).toEqual(testData));
    const req = httpController.expectOne(environment.loginURL);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });


});

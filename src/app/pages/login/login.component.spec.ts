import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminServiceService } from '../../services/admin-service.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { DebugElement } from '@angular/core';
import { Observable ,of} from 'rxjs';

class Page {
  get submitButton() {
    return this.fixture.nativeElement.querySelector('button');
  }
  get mailInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#email');
  }
  get passwordInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#password');
  }

  public updateValue(input: HTMLInputElement, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  constructor(private fixture: ComponentFixture<LoginComponent>) {}

}

fdescribe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let adminService: AdminServiceService;
  let adminServiceSpy: { login: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };
  let router: Router;
  let page: Page;
  let debugEl: DebugElement;

  beforeEach(async () => {
    adminServiceSpy = jasmine.createSpyObj(AdminServiceService, [environment.loginURL]);
    routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent], imports: [ReactiveFormsModule, HttpClientTestingModule
      ],
      providers: [
        { provide: AdminServiceService, useValue: adminServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }),
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    debugEl = fixture.debugElement;
    adminService = TestBed.inject(AdminServiceService);
    router = TestBed.inject(Router);
    page = new Page(fixture);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('Should set submitted to true', () => {
    loginComponent.loginSubmitData();
    expect(loginComponent.loginSubmitData).toBeTruthy();
  });

});

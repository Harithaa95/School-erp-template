import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingStepperComponent } from './setting-stepper.component';

describe('SettingStepperComponent', () => {
  let component: SettingStepperComponent;
  let fixture: ComponentFixture<SettingStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

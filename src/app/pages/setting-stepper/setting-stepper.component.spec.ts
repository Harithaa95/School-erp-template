import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { SettingStepperComponent } from './setting-stepper.component';
import { TranslateModule} from '@ngx-translate/core';

describe('SettingStepperComponent', () => {
  let component: SettingStepperComponent;
  let fixture: ComponentFixture<SettingStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingStepperComponent ],imports:[ReactiveFormsModule,TranslateModule]
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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdiseSetupComponent } from './udise-setup.component';

describe('UdiseSetupComponent', () => {
  let component: UdiseSetupComponent;
  let fixture: ComponentFixture<UdiseSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdiseSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdiseSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

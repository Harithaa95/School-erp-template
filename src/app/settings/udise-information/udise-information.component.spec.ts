import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdiseInformationComponent } from './udise-information.component';

describe('UdiseInformationComponent', () => {
  let component: UdiseInformationComponent;
  let fixture: ComponentFixture<UdiseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdiseInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdiseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

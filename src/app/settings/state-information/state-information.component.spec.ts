import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateInformationComponent } from './state-information.component';

describe('StateInformationComponent', () => {
  let component: StateInformationComponent;
  let fixture: ComponentFixture<StateInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

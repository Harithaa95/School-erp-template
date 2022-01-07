import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSetupComponent } from './storage-setup.component';

describe('StorageSetupComponent', () => {
  let component: StorageSetupComponent;
  let fixture: ComponentFixture<StorageSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

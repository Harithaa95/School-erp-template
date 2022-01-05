import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsDisplayComponent } from './breadcrumbs-display.component';

describe('BreadcrumbsDisplayComponent', () => {
  let component: BreadcrumbsDisplayComponent;
  let fixture: ComponentFixture<BreadcrumbsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

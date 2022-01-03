import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitianDashboardComponent } from './dietitian-dashboard.component';

describe('DietitianDashboardComponent', () => {
  let component: DietitianDashboardComponent;
  let fixture: ComponentFixture<DietitianDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitianDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitianDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

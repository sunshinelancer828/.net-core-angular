import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietitianDetailComponent } from './dietitian-detail.component';

describe('DietitianDetailComponent', () => {
  let component: DietitianDetailComponent;
  let fixture: ComponentFixture<DietitianDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietitianDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietitianDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

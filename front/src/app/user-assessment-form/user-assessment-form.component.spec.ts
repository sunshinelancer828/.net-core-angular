import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentFormComponent } from './user-assessment-form.component';

describe('UserAssessmentFormComponent', () => {
  let component: UserAssessmentFormComponent;
  let fixture: ComponentFixture<UserAssessmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssessmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssessmentFormComponent } from './list-assessment-form.component';

describe('ListAssessmentFormComponent', () => {
  let component: ListAssessmentFormComponent;
  let fixture: ComponentFixture<ListAssessmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssessmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

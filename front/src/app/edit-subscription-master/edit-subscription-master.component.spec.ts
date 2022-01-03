import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriptionMasterComponent } from './edit-subscription-master.component';

describe('EditSubscriptionMasterComponent', () => {
  let component: EditSubscriptionMasterComponent;
  let fixture: ComponentFixture<EditSubscriptionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriptionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubscriptionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

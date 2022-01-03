import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionMasterComponent } from './add-subscription-master.component';

describe('AddSubscriptionMasterComponent', () => {
  let component: AddSubscriptionMasterComponent;
  let fixture: ComponentFixture<AddSubscriptionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

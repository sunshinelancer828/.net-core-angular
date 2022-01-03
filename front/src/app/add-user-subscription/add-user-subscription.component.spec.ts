import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserSubscriptionComponent } from './add-user-subscription.component';

describe('AddUserSubscriptionComponent', () => {
  let component: AddUserSubscriptionComponent;
  let fixture: ComponentFixture<AddUserSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

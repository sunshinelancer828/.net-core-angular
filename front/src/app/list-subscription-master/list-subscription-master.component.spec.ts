import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubscriptionMasterComponent } from './list-subscription-master.component';

describe('ListSubscriptionMasterComponent', () => {
  let component: ListSubscriptionMasterComponent;
  let fixture: ComponentFixture<ListSubscriptionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubscriptionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubscriptionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

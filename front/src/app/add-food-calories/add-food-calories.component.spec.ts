import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodCaloriesComponent } from './add-food-calories.component';

describe('AddFoodCaloriesComponent', () => {
  let component: AddFoodCaloriesComponent;
  let fixture: ComponentFixture<AddFoodCaloriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodCaloriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

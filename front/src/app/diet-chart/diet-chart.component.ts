import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { SubscriptionService } from '../_services/subscription.service';
import { UsersService } from '../_services/users.service';
import { FoodCaloriesService } from './../_services/food-calories.service';
import { MealPlanDTO, userMealPlanDTO } from './../_models/userMealPlanDTO';
import { UserMealPlanService } from './../_services/user-meal-plan.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
export interface Food {
  name: string;
}

@Component({
  selector: 'app-diet-chart',
  templateUrl: './diet-chart.component.html',
  styleUrls: ['./diet-chart.component.css']
})

export class DietChartComponent implements OnInit {
  userId:string
  subscriptionId:string
  subscriptionName:string
  UserSubscriptions:any
  userMealPlan:userMealPlanDTO
  meals:MealPlanDTO
  Meals
  foods
  foodNames
  myControl = new FormControl();
  filteredOptions:Observable<any[]>
  options:any[]

  constructor(public router:Router,public userService:UsersService,public subService:SubscriptionService,public accountService:AccountService,public foodService:FoodCaloriesService ,public userMealPlanService:UserMealPlanService,public route:ActivatedRoute) { 
    this.userMealPlan={
      _id:null,
      fkUserId:'',
      fkSubscriptionId:'',
      DateFrom:null,
      DateTo:null,
      Meals:[]
    }
  }

  ngOnInit(): void {
    this.userId=this.route.snapshot.paramMap.get('userId')
    this.userService.getUserSubscriptions(this.userId).subscribe(
      res=>{
      this.UserSubscriptions=res;
      this.UserSubscriptions.forEach(element => {
      if((element.subscriptionDetails).isActive){ 
      this.subscriptionId=element._id 
      this.subscriptionName=(element.subscriptionDetails).name
      }
     });
    },
      err=>console.log(err)
    ) 
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(val => {
        if(val!==''){
          return this.filter(val || '')
        }
        else{
        return of(null);
        }
      })       
    );
  }
  
  filter(val: string): Observable<any[]> {
    return this.foodService.getFoodCalories()
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  

  
  addMeal(){
    let meals:MealPlanDTO={MealType:'',Foods:[]}
    this.userMealPlan.Meals.push(meals)
  }
  addFood(mealIndex){
   let food
   this.foodService.getFoodCaloriesByName(this.myControl.value).subscribe(
     res=>{
       food=res;
       console.log(food)
       this.userMealPlan.Meals[mealIndex].Foods.push(food)
      //  alert(this.myControl.value + " Added to "+ this.userMealPlan.Meals[mealIndex].MealType + " Meal")
     }
   )
  }
  removeFood(mealIndex,foodIndex){
    this.userMealPlan.Meals[mealIndex].Foods.splice(foodIndex,1)
  }
  addUserMealPlan(){
    this.userMealPlan.fkUserId=this.userId
    this.userMealPlan.fkSubscriptionId=this.subscriptionId
    // this.userMealPlan.Meals.Foods=this.foods[0];
    console.log(this.userMealPlan)
    this.userMealPlanService.addUserMealPlan(this.userMealPlan).subscribe(
      res=>{
        console.log(res)
        this.router.navigate(['/dashboard'])
      },
      err=>console.log(err)
    )
  }
  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodCaloriesDTO, TypesDTO } from '../_models/foodCaloriesDTO';
import { FoodCaloriesService } from './../_services/food-calories.service';

@Component({
  selector: 'app-add-food-calories',
  templateUrl: './add-food-calories.component.html',
  styleUrls: ['./add-food-calories.component.css']
})
export class AddFoodCaloriesComponent implements OnInit {


  food:FoodCaloriesDTO;
  types:TypesDTO
  constructor(private foodService:FoodCaloriesService,private router:Router,private toastr:ToastrService) { 
    this.types={
      type:'',
      portion:'',  
      portionType:'',
      count:0
    }
    this.food={
      id:null,
      name:'',
      totalCalories:0,
      types:this.types
    }
  }

  ngOnInit(): void {
  }
  addfood(){
    this.foodService.addFoodCalories(this.food).subscribe(
      res=>{
        this.toastr.success("Food Added successfully")
        this.router.navigate(['/food-calories'])
      },
      err=>{
        console.log(err);
      }
    )
  }
  cancel(){
    this.router.navigate(['/food-calories'])
  }

}

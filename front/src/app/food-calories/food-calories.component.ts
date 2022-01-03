import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '../_services/account.service';
import { FoodCaloriesService } from './../_services/food-calories.service';

@Component({
  selector: 'app-food-calories',
  templateUrl: './food-calories.component.html',
  styleUrls: ['./food-calories.component.css']
})
export class FoodCaloriesComponent implements OnInit {

 
  displayedColumns: string[] = ['position', 'name', 'totalCalories', 'type','portion','portionType','count'];
  FoodCalories ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private foodService:FoodCaloriesService,public accountService:AccountService) { }

  ngOnInit(): void {
    this.foodService.getFoodCalories().subscribe(
      res=>{
        res.forEach((food, i) => food.position = i+1 );
        this.FoodCalories= new MatTableDataSource(res);;
        this.FoodCalories.paginator = this.paginator;
        this.FoodCalories.sort = this.sort;
      },
      err=>console.log(err)
    )
  }
  }


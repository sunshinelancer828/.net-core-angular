import { Component, OnInit } from '@angular/core';
import { UserMealPlanService } from './../_services/user-meal-plan.service';
import { AccountService } from './../_services/account.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  userId
  userMealPlan
  constructor(public userMealService:UserMealPlanService,public accountService:AccountService) { }

  ngOnInit(): void {
    (this.accountService.currentUser$).subscribe(
      res=>this.userId=res?.user['_id']
    )
   this.userMealService.getUserMealByUserId(this.userId).subscribe(
        res=>{
          console.log(res)
          this.userMealPlan=res
        },
        err=>console.log(err)
      )

  }

}

import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './../_services/subscription.service';
import { AccountService } from './../_services/account.service';
import { UsersService } from './../_services/users.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit {

  Subscriptions
  id
  constructor(public subService:SubscriptionService,public accountService:AccountService,public userService:UsersService) { }

  ngOnInit(): void {
  (this.accountService.currentUser$).subscribe(
    res=>this.id=res?.user['_id']
  )

  this.userService.getUserSubscriptions(this.id).subscribe(
      res=>{
        this.Subscriptions=res;
      },
      err=>console.log(err)
    )
  }

}

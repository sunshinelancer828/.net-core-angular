import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { UsersService } from './../_services/users.service';
import { SubscriptionService } from './../_services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSubscriptionDTO,SubscriptionDTO } from './../_models/user-subscription';

@Component({
  selector: 'app-add-user-subscription',
  templateUrl: './add-user-subscription.component.html',
  styleUrls: ['./add-user-subscription.component.css']
})
export class AddUserSubscriptionComponent implements OnInit {
  public user_subscription:UserSubscriptionDTO
  public subscription:SubscriptionDTO
  user:any
  sub:any
  uid
  sid
  constructor(public accountService:AccountService, public userService:UsersService, public subService:SubscriptionService,
     public route:ActivatedRoute,public router:Router,public toastr:ToastrService) {
       this.user_subscription={
         fkUserId:"",
         subscriptionDetails:{
           name:"",
           subscriptionType:"",
           detail:"",
           duration: 0,
           durationType: "",
           amount: 0,
           offerAmount: 0,
           isActive:""
         },
         startDate:"",
         endDate: "",
         isActive : "",
         subscriptionAmount:0,
         paidAmount:0,
         notes:""
        }
      }

  ngOnInit(): void {
    this.uid=this.route.snapshot.paramMap.get('uid')
    this.userService.getUserById(this.uid).subscribe(
      res=>{
        this.user=res
      },
      err=>console.log(err)
    )
    this.sid=this.route.snapshot.paramMap.get('sid')
    this.subService.getSubscriptionById(this.sid).subscribe(
      res=>{
        this.sub=res
        this.user_subscription.subscriptionDetails=this.sub;
        this.user_subscription.isActive=this.sub.isActive
      },
      err=>console.log(err)
    )
  }
  ceateUserSub(){
    this.user_subscription.fkUserId=this.uid=this.route.snapshot.paramMap.get('uid')
    this.userService.createUserSubscription(this.user_subscription).subscribe(
      res=>{
        console.log(res)
        this.toastr.success("Subscription added successfully")
        this.router.navigate(['/dashboard']);
      },
      err=>console.log(err)
    )
  }

}

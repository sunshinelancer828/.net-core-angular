import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '../_services/account.service';
import { SubscriptionService } from '../_services/subscription.service';
import { UsersService } from './../_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { appUserDTO } from './../_models/appUserDTO';


@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'subscriptionType', 'detail','duration','amount','offerAmount','isActive','edit'];
  Subscriptions ;
  userDetails:appUserDTO;
  userType
  id:string
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public userService:UsersService,public subService:SubscriptionService,public accountService:AccountService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.accountService.currentUser$.subscribe(
    //   res=>
    //   {
    //     console.log(res)
    //     this.userType=res.user?.['userType'];
    //   }
    // )
    this.id=this.route.snapshot.paramMap.get('id')
    this.userService.getUserById(this.id).subscribe(
      res=>{
        this.userDetails=res?.['userType']
        this.userType=this.userDetails;
        this.subService.getSubscriptionsByUserType(this.userType).subscribe(
          res=>{
            this.Subscriptions=res; 
          },
          err=>console.log(err)
        )
      },
      err=>console.log(err)
    )
    
  }

}

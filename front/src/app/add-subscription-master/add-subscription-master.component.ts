import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './../_services/subscription.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-subscription-master',
  templateUrl: './add-subscription-master.component.html',
  styleUrls: ['./add-subscription-master.component.css']
})
export class AddSubscriptionMasterComponent implements OnInit {

  subscription:any={};
  constructor(private subService:SubscriptionService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  addSubscription(){
    if(this.subscription.isActive=="true")
      this.subscription.isActive=true;
    if(this.subscription.isActive=="false")
      this.subscription.isActive=false;
    this.subService.addSubscription(this.subscription).subscribe(
      res=>{
        this.toastr.success("Subscription added successfully")
        this.router.navigate(['/list-subscription'])
      },
      err=>{
        console.log(err);
      }
    )
  }
  cancel(){
    this.router.navigate(['/list-subscription'])
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SubscriptionService } from './../_services/subscription.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-subscription-master',
  templateUrl: './edit-subscription-master.component.html',
  styleUrls: ['./edit-subscription-master.component.css']
})
export class EditSubscriptionMasterComponent implements OnInit {
  subscription:any={}
  id:any
  constructor(private route:ActivatedRoute,private subService:SubscriptionService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.subService.getSubscriptionById(this.id).subscribe(
      res=>{
        this.subscription=res
      },
      err=>console.log(err)
    )
  }
  updateSubscription(){
        this.subService.updateSubscription(this.id,this.subscription).subscribe(
          res=>{
            this.toastr.success("Updated successfully")
            this.router.navigate(['/list-subscription'])
          },
          err=>{
            console.log(err);
          }
        )
  }

}

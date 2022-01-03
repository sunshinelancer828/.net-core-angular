import { Component, OnInit } from '@angular/core';
import { UsersService } from './../_services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appUserDTO } from './../_models/appUserDTO';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  user:appUserDTO;
  id:any
  constructor(public userService:UsersService,public router:Router,public toastr:ToastrService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.userService.getUserById(this.id).subscribe(
      data=>{
        this.user=data
       // console.log(this.user)
      },
      err=>console.log(err)
    )
  }
  updateUser(){
        this.user.servicedByUser=this.user.servicedByUser
        this.userService.updateUser(this.id,this.user).subscribe(
          res=>{
            this.toastr.success("Updated successfully")
            this.router.navigate(['/view-users'])
          },
          err=>{
            console.log(err);
          }
        )

  }

}

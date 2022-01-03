import { Component, Inject, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignedInComponent } from './../signed-in/signed-in.component';
import { LoginComponent } from './../login/login.component';
import { LoaderService } from '../_services/loader.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  model:any = {};
  isChecked
  constructor(public accountService: AccountService, private toastr: ToastrService,
    protected router: Router,public dialog: MatDialog, public loaderService: LoaderService) { }

  ngOnInit(): void {
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //   });
  // }
  logout(){
    this.accountService.logout();
    this.router.navigate(['/home'])
    this.toastr.success("Logged out successfully")
  }
  
  menuClose(){
    // document.getElementById("navi-toggle").click()
    this.isChecked=false
  }

}


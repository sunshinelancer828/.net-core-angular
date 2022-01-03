import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any = {};
  user:any;
  constructor(private accountService:AccountService,private router:Router,private toastr:ToastrService,public dialog:MatDialog) { }

  ngOnInit(): void {
const inputs = document.querySelectorAll(".input");
function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}
function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}
inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

}

  login(){
    this.accountService.login(this.model)
      .subscribe(response => {
        this.router.navigate(['/dashboard']);
        this.toastr.success("Logged in successfully")
      }, error => {

      })
  }
  show_hide_password(){
    var input = document.getElementById('password-input');
    var control=document.getElementById('password-control')
    if (input.getAttribute('type') == 'password') {
      control.classList.add('view');
      input.setAttribute('type', 'text');
    } else {
      control.classList.remove('view');
      input.setAttribute('type', 'password');
    }
    return false;
  }
  close(){
    this.router.navigate(['/home']);
  }
}

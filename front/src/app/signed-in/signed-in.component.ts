import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.css']
})
export class SignedInComponent implements OnInit {
  users
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users =>{
      this.users = users;
    });
  }

}

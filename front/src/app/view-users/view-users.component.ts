import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './../_services/users.service';
import { AccountService } from './../_services/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent implements OnInit {
  id
  clients
  displayedColumns: string[] = ['Position','Email', 'UserType', 'Name','Contact', 'Edit'];
  users:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public userService:UsersService,public accountService:AccountService) { }

  ngOnInit(): void {
    (this.accountService.currentUser$).subscribe(
      res=>this.id=res?.user['_id']
    )
    this.userService.getClients(this.id).subscribe(
      res=>{
        res.forEach((user, i) => user.position = i+1 );
        this.users= new MatTableDataSource(res);
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
      },
      err=>console.log(err)
    )


  }

}

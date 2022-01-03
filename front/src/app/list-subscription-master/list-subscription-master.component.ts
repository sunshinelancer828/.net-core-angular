import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubscriptionService } from '../_services/subscription.service';
import { AccountService } from './../_services/account.service';


@Component({
  selector: 'app-list-subscription-master',
  templateUrl: './list-subscription-master.component.html',
  styleUrls: ['./list-subscription-master.component.css']
})
export class ListSubscriptionMasterComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'subscriptionType', 'detail','duration','amount','offerAmount','isActive','edit'];
  Subscriptions ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private subService:SubscriptionService,public accountService:AccountService) { }

  ngOnInit(): void {
    this.subService.getSubscriptions().subscribe(
      res=>{
        res.forEach((sub, i) => sub.position = i+1 );
        this.Subscriptions= new MatTableDataSource(res);;
        this.Subscriptions.paginator = this.paginator;
        this.Subscriptions.sort = this.sort;
      },
      err=>console.log(err)
    )
  }
}

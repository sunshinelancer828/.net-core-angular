import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private accountService: AccountService) { }

  intercept(req, next){
    let token = null;
    this.accountService.currentUser$.subscribe((user) => {
      token = user == null ? null : user.token
    });
    if(token == null) return next.handle(req);

    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(tokenizedReq);
  }
}

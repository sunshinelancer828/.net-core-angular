import { Injectable } from '@angular/core';
import { AppConfig } from '../constants/app-config';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = AppConfig.URL_AppServices;
  private currentUserSource = new ReplaySubject<User>(1);//size of the buffer
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(formData: any){
    return this.http.post(this.baseUrl + "AppUser/login",formData).pipe(
      map((response:any) => {
        const user = response;
        if(user){
          localStorage.setItem('token', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}

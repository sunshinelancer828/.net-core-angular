import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../constants/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserMealPlanService {
  baseUrl = AppConfig.URL_AppServices;

  constructor(private http: HttpClient) { }

  getUserMealPlans(){
    return this.http.get(this.baseUrl + "UserMealPlan/GetUserMealPlans").pipe(
      map((response:any) => {
        return response;
      })
    );
    }
    addUserMealPlan(formData){
    return this.http.post(this.baseUrl + "UserMealPlan/CreateUserMealPlan",formData).pipe(
        map((response:any) => {
        return response;
        })
    );
    }
  getUserMealByUserId(id){
    const headers={
      'content-type':'application/json'
    }
    return this.http.get(`https://localhost:44322/UserMealPlan/GetUserMealByUserId?id=${id}`).pipe(
      map((response:any) => {
        return response;
      })
    );
  }
// updateSubscription(id,formData){
//   return this.http.post(this.baseUrl + `Subscription/EditSubscription?id=${id}`,formData).pipe(
//     map((response:any) => {
//       return response;
//     })
//   );
// }
// getSubscriptionsByUserType(userType){
//   return this.http.get(this.baseUrl + `Subscription/GetSubscriptionsByUserType?userType=${userType}`).pipe(
//     map((response:any) => {
//       return response;
//     })
//   );
// }

}


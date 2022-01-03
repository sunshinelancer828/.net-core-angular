import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../constants/app-config';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  baseUrl = AppConfig.URL_AppServices;

  constructor(private http: HttpClient) { }

  getSubscriptions(){
    return this.http.get(this.baseUrl + "Subscription/GetSubscriptions").pipe(
      map((response:any) => {
        return response;
      })
    );
}
addSubscription(formData){
  return this.http.post(this.baseUrl + "Subscription/CreateSubscription",formData).pipe(
    map((response:any) => {
      return response;
    })
  );
}
getSubscriptionById(id){
  return this.http.get(this.baseUrl + `Subscription/GetSubscriptionById?id=${id}`).pipe(
    map((response:any) => {
      return response;
    })
  );
}
updateSubscription(id,formData){
  return this.http.post(this.baseUrl + `Subscription/EditSubscription?id=${id}`,formData).pipe(
    map((response:any) => {
      return response;
    })
  );
}
getSubscriptionsByUserType(userType){
  return this.http.get(this.baseUrl + `Subscription/GetSubscriptionsByUserType?userType=${userType}`).pipe(
    map((response:any) => {
      return response;
    })
  );
}

}


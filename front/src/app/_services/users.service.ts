import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../constants/app-config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = AppConfig.URL_AppServices;

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.baseUrl + "AppUser/GetUsers").pipe(
      map((response:any) => {
        return response;
      })
    );
}
createUser(formData,file):Observable<any>{
  this.uploadFile(file).subscribe();
  return this.http.post(this.baseUrl+"AppUser/CreateUser",formData).pipe(
    map((res:any)=>{
      return res;
    })
  )
}

getUserById(id){
  return this.http.get(this.baseUrl+`AppUser/GetUserById?id=${id}`).pipe(
  map((res:any)=>{
    return res;
  })
  )
}
updateUser(id,formData){
  return this.http.post(this.baseUrl+`AppUser/Update?id=${id}`,formData).pipe(
    map((res:any)=>{
      return res;
    })
  )
}
uploadFile(file:File):Observable<any>{
  let formData: FormData = new FormData();
  formData.append('file', file, file.name);

// const headers = new HttpHeaders().append('Content-Type', 'mulipart/form-data');

  return this.http.post(this.baseUrl+'AppUser/UploadFile',formData).pipe(
    map((res:any)=>{
      return res;
    })
  )
}
uploadFileById(id,file:File):Observable<any>{
  let formData: FormData = new FormData();
  formData.append('file', file, file.name);
// const headers = new HttpHeaders().append('Content-Type', 'mulipart/form-data');
  return this.http.post(this.baseUrl+`AppUser/UploadFileById?id=${id}`,formData).pipe(
    map((res:any)=>{
      return res;
    })
  )
}
createUserSubscription(subData){
  return this.http.post(this.baseUrl+'UserSubscription/CreateUserSubscription',subData).pipe(
    map((res:any)=>{
      return res;
    })
  )
}
getUserSubscriptions(id){
  return this.http.get(this.baseUrl+`UserSubscription/GetUserSubscriptionsByUserId?id=${id}`).pipe(
    map((res:any)=>{
      return res;
    })
  )
}
getClients(id){
  return this.http.get(this.baseUrl+`AppUser/GetClients?id=${id}`).pipe(
    map((res:any)=>{
      return res;
    })
  )
}
}


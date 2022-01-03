import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../constants/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserAssessmentFormService {
    baseUrl = AppConfig.URL_AppServices;

    constructor(private http: HttpClient) { }
    addUserAssessmentForm(formData){
        const headers={
            'content-type':'application/json'
          }
          return this.http.post(this.baseUrl + "UserAssessmentForm/CreateUserAssessmentForm", formData,{headers:headers}).pipe(
            map((response) => {
              return response;
            })
          );
    }
    getUserAssessmentByUserId(userId){
      return this.http.get(this.baseUrl + `UserAssessmentForm/GetUserAssessementFormByUserId?userId=${userId}`).pipe(
        map((response:any) => {
          return response;
        })
      );
    }
}
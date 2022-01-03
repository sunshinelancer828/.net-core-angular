import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../constants/app-config';

@Injectable({
  providedIn: 'root'
})
export class FoodCaloriesService {
  baseUrl = AppConfig.URL_AppServices;

  constructor(private http: HttpClient) { }

getFoodCalories(){
    return this.http.get(this.baseUrl + "FoodCalories/GetFoodCalories").pipe(
      map((response:any) => {
        return response;
      })
    );
}
addFoodCalories(formData){
  return this.http.post(this.baseUrl + "FoodCalories/CreateFoodCalories",formData).pipe(
    map((response:any) => {
      return response;
    })
  );
}
getFoodCaloriesById(id){
  return this.http.get(this.baseUrl + `FoodCalories/GetFoodCaloriesById?id=${id}`).pipe(
    map((response:any) => {
      return response;
    })
  );
}
updateFoodCalories(id,formData){
  return this.http.post(this.baseUrl + `FoodCalories/UpdateFoodCalories?id=${id}`,formData).pipe(
    map((response:any) => {
      return response;
    })
  );
}

getFoodCaloriesByName(foodName){
  return this.http.get(this.baseUrl + `FoodCalories/GetFoodCaloriesByName?foodName=${foodName}`).pipe(
    map((response:any) => {
      return response;
    })
  );  
}
getFoodCaloriesType(foodType){
  return this.http.get(this.baseUrl + `FoodCalories/GetFoodCaloriesByType?userType=${foodType}`).pipe(
    map((response:any) => {
      return response;
    })
  );
}

}


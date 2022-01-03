import { FoodCaloriesDTO } from './foodCaloriesDTO';
export class userMealPlanDTO{
    _id:string
    fkUserId:string
    fkSubscriptionId:string
    DateFrom:Date
    DateTo:Date
    Meals:MealPlanDTO[]
}
export interface MealPlanDTO{
    MealType:string
    Foods:FoodCaloriesDTO[]
}
export interface FoodCaloriesDTO{
   id:string,
   name:string,
   totalCalories:number
   types:TypesDTO
  }
  export interface TypesDTO{
    type:string,
    portion:string,
    portionType:string,
    count:number
  }
  
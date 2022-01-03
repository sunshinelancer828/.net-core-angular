export interface UserSubscriptionDTO{
    fkUserId:string,
    subscriptionDetails:SubscriptionDTO,
    startDate:any,
    endDate:any,
    isActive:string,
    subscriptionAmount:Number,
    paidAmount:Number,
    notes:string
  }
  export interface SubscriptionDTO{
    name:string,
    subscriptionType:string,
    detail:string,
    duration:Number,
    durationType:string,
    amount:Number,
    offerAmount:Number
    isActive: string
  }
  
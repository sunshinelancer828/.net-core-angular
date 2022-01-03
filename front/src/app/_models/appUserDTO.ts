
export interface appUserDTO{
    email:string
    password:string
    userType:string
    firstName:string
    lastName:string
    contact:string
    address:string
    photoPath:string
    business:BusinessDTO
    servicedByUser:string
}
export interface BusinessDTO{
    name:string
    logoPath:string
    description:string
    email:string
    contact:string
    address:string
}
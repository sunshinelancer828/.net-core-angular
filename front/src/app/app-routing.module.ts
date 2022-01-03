import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubscriptionMasterComponent } from './add-subscription-master/add-subscription-master.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListSubscriptionMasterComponent } from './list-subscription-master/list-subscription-master.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SignedInComponent } from './signed-in/signed-in.component';
import { AuthGuard } from './_guards/auth.guard';
import { EditSubscriptionMasterComponent } from './edit-subscription-master/edit-subscription-master.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BmiCalculatorComponent } from './bmi-calculator/bmi-calculator.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { AddUserSubscriptionComponent } from './add-user-subscription/add-user-subscription.component';
import { ListAssessmentFormComponent } from './list-assessment-form/list-assessment-form.component';
import { AddAssessmentFormComponent } from './add-assessment-form/add-assessment-form.component';
import { UserAssessmentFormComponent } from './user-assessment-form/user-assessment-form.component';
import { FoodCaloriesComponent } from './food-calories/food-calories.component';
import { AddFoodCaloriesComponent } from './add-food-calories/add-food-calories.component';
import { DietChartComponent } from './diet-chart/diet-chart.component';
import { AssessmentFormsComponent } from './assessment-forms/assessment-forms.component';
import { LoginComponent } from './login/login.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

// import { EditAssessmentFormComponent } from './edit-assessment-form/edit-assessment-form.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'bmi-calculator', component: BmiCalculatorComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children:[
      {path:'myprofile',component:ViewProfileComponent},
      {path: 'dashboard', component: MainDashboardComponent},
      {path: 'add-subscription', component: AddSubscriptionMasterComponent},
      {path: 'list-subscription', component: ListSubscriptionMasterComponent},
      {path: 'edit-subscription/:id',component:EditSubscriptionMasterComponent},
      // {path: 'view-users',component:ViewUsersComponent},
      {path: 'update-user/:id',component:UpdateUsersComponent},
      {path: 'subscriptions/:uid/add-user-subscription/:sid',component:AddUserSubscriptionComponent},
      {path: 'subscriptions/:id',component:UserSubscriptionsComponent},
      {path: "my-subscriptions",component:MySubscriptionsComponent},
      {path: 'subscriptions/:uid/add-user-subscription/:sid',component:AddUserSubscriptionComponent},
      {path: 'list-assessment-form',component:ListAssessmentFormComponent},
      {path: 'add-assessment-form',component:AddAssessmentFormComponent},
      {path: 'list-assessment-form/edit-assessment-form/:eaid',component:AddAssessmentFormComponent},
      {path:'user-assessment-form',component:UserAssessmentFormComponent},
      {path:'food-calories',component:FoodCaloriesComponent},
      {path:'add-food-calories',component:AddFoodCaloriesComponent},
      {path:'diet-chart/:userId',component:DietChartComponent},
      {path:'assessment-forms/:userId',component:ListAssessmentFormComponent}
    ]
  },
  {path:'sign-up',component:SignUpComponent},
  {path: '**', component: HomeComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule] 
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignedInComponent } from './signed-in/signed-in.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './_interceptors/token-interceptor.service';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { DietitianDashboardComponent } from './dietitian-dashboard/dietitian-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { DietitianListComponent } from './dietitian-list/dietitian-list.component';
import { DietitianDetailComponent } from './dietitian-detail/dietitian-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

//material
import { MatNativeDateModule } from '@angular/material/core';
// import { MatIconRegistry } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { AddSubscriptionMasterComponent } from './add-subscription-master/add-subscription-master.component';
import { ListSubscriptionMasterComponent } from './list-subscription-master/list-subscription-master.component';
import { EditSubscriptionMasterComponent } from './edit-subscription-master/edit-subscription-master.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoaderInterceptorService } from './_interceptors/loader-interceptor.service';
import { BmiCalculatorComponent } from './bmi-calculator/bmi-calculator.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { UserSubscriptionsComponent } from './user-subscriptions/user-subscriptions.component';
import { ErrorInterceptor } from './_interceptors/error-interceptor.service';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { AddUserSubscriptionComponent } from './add-user-subscription/add-user-subscription.component';
import { ListAssessmentFormComponent } from './list-assessment-form/list-assessment-form.component';
import { AddAssessmentFormComponent } from './add-assessment-form/add-assessment-form.component';
import { UserAssessmentFormComponent } from './user-assessment-form/user-assessment-form.component';
import { FoodCaloriesComponent } from './food-calories/food-calories.component';
import { AddFoodCaloriesComponent } from './add-food-calories/add-food-calories.component';
import { DietChartComponent } from './diet-chart/diet-chart.component';
import { AssessmentFormsComponent } from './assessment-forms/assessment-forms.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignedInComponent,
    HomeComponent,
    MainDashboardComponent,
    SuperadminDashboardComponent,
    DietitianDashboardComponent,
    ClientDashboardComponent,
    DietitianListComponent,
    DietitianDetailComponent,
    ClientListComponent,
    ClientDetailComponent,
    LoginComponent,
    AddSubscriptionMasterComponent,
    ListSubscriptionMasterComponent,
    EditSubscriptionMasterComponent,
    ContactUsComponent,
    AboutUsComponent,
    BmiCalculatorComponent,
    SignUpComponent,
    ViewUsersComponent,
    UpdateUsersComponent,
    UserSubscriptionsComponent,
    AddUserSubscriptionComponent,
    MySubscriptionsComponent,
    ListAssessmentFormComponent,
    AddAssessmentFormComponent,
    UserAssessmentFormComponent,
    FoodCaloriesComponent,
    AddFoodCaloriesComponent,
    DietChartComponent,
    AssessmentFormsComponent,
    ViewProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
    FlexLayoutModule
  ],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

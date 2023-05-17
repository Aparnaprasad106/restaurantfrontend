import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DishComponent } from './dish/dish.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  // home page
  {
    path:'',component:HomeComponent
  },
  // admin dashboard
  {
    path:'admindashboard',component:AdminComponent
  },
   // dishes
  {
    path:'dishview',component:DishComponent
  },
  // cart
  {
    path:'cart',component:CartComponent
  },
  // admin login
  {
    path:'adminlogin',component:AdminLoginComponent
  },
  // reservation details
  {
    path:'reservation/:phone',component:ReservationComponent
  },
  // page not found
  {
    path:'**',component:PageNotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

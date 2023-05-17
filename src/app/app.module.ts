import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DishComponent } from './dish/dish.component';
import { SearchPipe } from './search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CartComponent } from './cart/cart.component'
import { NgxPayPalModule } from 'ngx-paypal';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    AdminComponent,
    DishComponent,
    SearchPipe,
    FilterPipe,
    CartComponent,
    AdminLoginComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./auth/service/user.service";
import {HttpClientModule} from "@angular/common/http";
import { CustomerComponent } from './customer/customer.component';
import { ReservationComponent } from './reservation/reservation.component';
import {ReservationService} from "./reservation/service/reservation.service";
import {FlightService} from "./flight/service/flight.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomerService} from "./customer/service/customer.service";
import { PaymentComponent } from './payment/payment.component';
import {PaymentService} from "./payment/service/payment.service";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {DashboardService} from "./admin-dashboard/service/dashboard.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    ReservationComponent,
    PaymentComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [UserService, FlightService, ReservationService, CustomerService, PaymentService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

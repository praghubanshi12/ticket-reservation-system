import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CustomerComponent} from "./customer/customer.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {PaymentComponent} from "./payment/payment.component";
import {AuthGuard} from "./auth/guard/auth.guard";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'customer/:id', component:CustomerComponent},
  {path: 'reservation', component:ReservationComponent, canActivate: [AuthGuard]},
  {path: 'payment/:reservationId', component:PaymentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

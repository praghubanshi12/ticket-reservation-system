import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CustomerComponent} from "./customer/customer.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {PaymentComponent} from "./payment/payment.component";
import {AuthGuard} from "./auth/guard/auth.guard";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: '', component:LoginComponent},
  {path: 'customer/:id', component:CustomerComponent, canActivate: [AuthGuard], data:{role: "customer"}},
  {path: 'reservation', component:ReservationComponent, canActivate: [AuthGuard], data:{role: "customer"}},
  {path: 'payment/:reservationId', component:PaymentComponent, canActivate: [AuthGuard], data:{role: "customer"}},
  {path: 'admin/dashboard', component:AdminDashboardComponent, canActivate: [AuthGuard], data:{role: "admin"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

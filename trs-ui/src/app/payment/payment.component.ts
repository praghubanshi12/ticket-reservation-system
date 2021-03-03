import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../reservation/service/reservation.service";
import {Reservation} from "../reservation/model/reservation";
import {PaymentService} from "./service/payment.service";
import {Payment} from "./model/payment";
import {CustomerService} from "../customer/service/customer.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  reservation: any = new Reservation();

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private paymentService:PaymentService, private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=> {
      var reservationId = params["reservationId"];
      this.reservationService.findById(reservationId).subscribe(data=> {
        this.reservation = data;
      })
    });
  }

  makePayment(reservationId: bigint){
    var payment = new Payment();
    payment.reservation = new Reservation();
    payment.reservation.id = reservationId;
    this.paymentService.makePayment(payment).subscribe(data=>{
      alert("Payment successful");
      this.router.navigate(["customer/"+this.customerService.getCustomerIdFromSession()]);
    });
  }

  showReservations(){
    this.router.navigate(['customer/'+this.customerService.getCustomerIdFromSession()]);
  }
}

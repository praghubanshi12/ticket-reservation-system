import { Component, OnInit } from '@angular/core';
import {UserService} from "../auth/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../reservation/service/reservation.service";
import {Reservation} from "../reservation/model/reservation";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  reservations: any = new Array<Reservation>();

  constructor(private route: ActivatedRoute, private router:Router, private userService: UserService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
        var customerId = params["id"];
        this.reservationService.findByCustomerId(customerId).subscribe(data=>{
          this.reservations = data;
        })
    })
  }

  makePayment(reservationId:bigint){
    this.router.navigate(["payment/"+ reservationId]);
  }
}

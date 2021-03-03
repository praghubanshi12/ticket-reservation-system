import {Component, OnInit} from '@angular/core';
import {FlightService} from "../flight/service/flight.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "./service/reservation.service";
import {Reservation} from "./model/reservation";
import {FlightDetails} from "../flight/model/flight-details";
import {UserService} from "../auth/service/user.service";
import {Customer} from "../customer/model/customer";
import {CustomerService} from "../customer/service/customer.service";
import {Router} from "@angular/router";
import {FlightDepartureTime} from "../flight/model/flight-departure-time";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  flightDetails: Array<any> = [];
  selectedDate: Date = new Date();
  selectedFlight: any = {};
  reservationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private userService: UserService, private flightService: FlightService, private reservationService: ReservationService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      flightDetails: ['', Validators.required],
      date: [formatDate(this.selectedDate, 'yyyy-MM-dd', 'en','+0545'), Validators.required],
      flightDepartureTime: ['', Validators.required]
    });
    this.flightService.getAllFlightDetails().subscribe(res => {
      res.forEach((flight: any) => {
        this.flightDetails.push(flight);
      });
    })
  }

  fromToChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    const flightId = element.value
    for (let flight of this.flightDetails) {
      if (flightId == flight.id) {
        this.selectedFlight = flight;
        break;
      }
    }
  }

  onsubmit() {
    if (!this.reservationForm.valid) {
      return;
    }
    const reservation = new Reservation();
    reservation.reservationDate = this.reservationForm.controls.date.value;
    reservation.customer = new Customer();
    reservation.customer!.id = this.customerService.getCustomerIdFromSession();
    reservation.flightDetails = new FlightDetails();
    reservation.flightDetails!.id = this.reservationForm.controls.flightDetails.value;
    reservation.flightDepartureTime = new FlightDepartureTime();
    reservation.flightDepartureTime!.id = this.reservationForm.controls.flightDepartureTime.value;

    this.reservationService.reserve(reservation).subscribe(data => {
        alert("Reservation success");
        this.router.navigate(["payment/" + data.id]);
      },
      error => {
        console.log(error);
      })
  }

  showCustomerReservations(){
    this.router.navigate(['customer/'+ this.customerService.getCustomerIdFromSession()]);
  }

}

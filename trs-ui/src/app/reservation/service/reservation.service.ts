import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) { }

  reserve(reservation: Reservation){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Reservation>('http://localhost:8080/reservations', reservation, httpOptions);
  }

  findById(id: bigint){
    return this.http.get('http://localhost:8080/reservations/' + id);
  }

  findByCustomerId(customerId: bigint){
    return this.http.get('http://localhost:8080/reservations/customer/' + customerId);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import {Observable} from "rxjs";
import {UserService} from "../../auth/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  reserve(reservation: Reservation) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Reservation>('http://localhost:8080/trs/reservations', reservation, {"headers": this.userService.getBearerTokenHeader()});
  }

  findById(id: bigint) {
    return this.http.get('http://localhost:8080/trs/reservations/' + id, {"headers": this.userService.getBearerTokenHeader()});
  }

  findByCustomerId(customerId: bigint) {
    return this.http.get('http://localhost:8080/trs/reservations/customer/' + customerId, {"headers": this.userService.getBearerTokenHeader()});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../../auth/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getAllFlightDetails(): Observable<any> {
    return this.http.get("http://localhost:8080/trs/flights", {"headers": this.userService.getBearerTokenHeader()});
  }
}

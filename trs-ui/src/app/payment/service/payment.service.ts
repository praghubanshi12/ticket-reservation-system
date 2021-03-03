import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Payment} from "../model/payment";
import {UserService} from "../../auth/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private userService: UserService) { }

  makePayment(payment: Payment){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:8080/trs/payment', payment,{"headers": this.userService.getBearerTokenHeader()});
  }
}

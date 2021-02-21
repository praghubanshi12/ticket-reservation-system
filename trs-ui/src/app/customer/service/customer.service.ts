import { Injectable } from '@angular/core';
import {UserService} from "../../auth/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private userService: UserService) { }

  getLoggedInCustomerId(){
    var token = this.userService.getToken();
    return token["trs_customer_id"];
  }
}

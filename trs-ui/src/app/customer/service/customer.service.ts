import {Injectable} from '@angular/core';
import {UserService} from "../../auth/service/user.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getLoggedInCustomerId(){
   return this.http.get<any>('http://localhost:8080/trs/customers/loggedIn', {headers: this.userService.getBearerTokenHeader()});
  }

  getCustomerIdFromSession(): any{
    return window.sessionStorage.getItem("customer-id");
  }
}

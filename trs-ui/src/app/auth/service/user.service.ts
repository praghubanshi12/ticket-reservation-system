import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(loginPayload: String) {
    const headers = {
      'Authorization': 'Basic ' + btoa('trs-client:trs-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8080/oauth/token', loginPayload, {headers});
  }

  getToken() {
    var token = window.sessionStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }
    return false;
  }

  getLoggedInRole(){
    var token = this.getToken();
    var role: String = token["trs_user_role"];
    return role.toUpperCase();
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getOAuthToken(loginPayload: String) {
    const headers = {
      'Authorization': 'Basic ' + btoa('trs-client:trs-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post<any>('http://localhost:8080/oauth/token', loginPayload, {headers});
  }

  getBearerTokenHeader(){
    return {
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
    };
  }

  getToken() {
    return window.sessionStorage.getItem('token');
  }

  getLoggedInRole(){
    return window.sessionStorage.getItem('role');
  }
}

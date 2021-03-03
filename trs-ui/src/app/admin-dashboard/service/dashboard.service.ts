import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../../auth/service/user.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient, private userService: UserService) { }

  getReportData(date: String):Observable<any>{
    return this.http.get("http://localhost:8080/admin/dashboard/count?date=" + date, {"headers": this.userService.getBearerTokenHeader()});
  }
}

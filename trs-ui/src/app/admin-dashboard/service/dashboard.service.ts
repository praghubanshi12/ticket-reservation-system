import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) { }

  getReportData(date: String):Observable<any>{
    return this.http.get("http://localhost:8080/dashboard/count?date=" + date);
  }
}

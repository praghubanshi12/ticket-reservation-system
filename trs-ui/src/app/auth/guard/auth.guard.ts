import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.getToken()) {
      this.router.navigate(["login"]);
      return false;
    }
    if (JSON.stringify(route.data) !== "{}") {
      let loggedInRole = this.userService.getLoggedInRole();
      if (loggedInRole?.indexOf(route.data.role.toUpperCase()) == -1) {
        this.router.navigate([""]);
        return false;
      }
    }
    return true;
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../auth/service/user.service";
import {HttpParams} from "@angular/common/http";
import {CustomerService} from "../customer/service/customer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private customerService: CustomerService) {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.userService.getOAuthToken(body.toString()).subscribe(data => {
      console.log(data);
      window.sessionStorage.setItem('token', data["access_token"]);
      var role = data["role"];
      window.sessionStorage.setItem('role', role);
      if (role == "ROLE_ADMIN") this.router.navigate(["admin/dashboard"]);
      if (role == "ROLE_CUSTOMER")
        this.customerService.getLoggedInCustomerId().subscribe(data => {
          var customerId = data["id"];
          window.sessionStorage.setItem('customer-id', customerId);
          this.router.navigate(["customer/" + customerId]);
        });
    }, error => {
      console.log(error)
      alert(error)
    });
  }

  ngOnInit(): void {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}

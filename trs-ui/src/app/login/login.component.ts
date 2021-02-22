import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../auth/service/user.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.userService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      var token = this.userService.getToken();
      var role = token["trs_user_role"];
      var navigateLink = (role.toUpperCase() == "ADMIN" ? ['admin/dashboard'] : ['customer/'+ token["trs_customer_id"]]);
      this.router.navigate(navigateLink);
    }, error => {
      alert(error.error.error_description)
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

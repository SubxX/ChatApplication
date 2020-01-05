import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../../Api Methods/api-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  showProgressSpinner = false;
  invalidcred = '';
  constructor(private api: ApiServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  userLogin() {
    if (this.loginForm.status !== 'INVALID') {
      this.api.login(this.loginForm.value)
        .subscribe(
          (res) => {
            this.showProgressSpinner = true;
            this.loginForm.disable();
            localStorage.setItem('authtoken', res.token);
            setTimeout(() => {
              this.showProgressSpinner = false;
              this.router.navigate(['/chatapplication/welcome']);
            }, 2000);
          },
          (err) => {
            this.invalidcred = 'invalid credentials';
            this.loginForm.controls.password.setValue('');
            setTimeout(() => {
              this.invalidcred = '';
            }, 3000);
          }
        );
    }
  }
  enterKeytoLogin(e) {
    if (e.keyCode === 13 && this.loginForm.status !== 'INVALID') {
      this.userLogin();
    } else {
      return false;
    }
  }



}

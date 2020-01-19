import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  showProgressSpinner = false;
  invalidcred: boolean;
  socket;
  verificationWindow = false;
  constructor(private api: ApiServiceService, private fb: FormBuilder, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    sessionStorage.clear();
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
      this.closeInvalidCred();
      this.api.login(this.loginForm.value)
        .subscribe(
          (res) => {
            this.showProgressSpinner = true;
            this.loginForm.disable();
            localStorage.setItem('authtoken', res.token);
            setTimeout(() => {
              this.socket.emit('refreshStatus', {});
              this.showProgressSpinner = false;
              this.router.navigate(['/chatapplication/welcome']);
            }, 2000);
          },
          (err) => {
            if (err.error.loginerr === 'INVALID CREDENTIALS') {
              this.invalidcred = true;
              this.loginForm.controls.password.setValue('');
            }
            if (err.error.loginerr === 'email verification due') {
              sessionStorage.setItem('email', this.loginForm.value.email);
              this.verificationWindow = true;
            }
          }
        );
    }
  }
  closeInvalidCred() {
    this.invalidcred = false;
  }
  enterKeytoLogin(e) {
    if (e.keyCode === 13 && this.loginForm.status !== 'INVALID') {
      this.userLogin();
    } else {
      return false;
    }
  }



}
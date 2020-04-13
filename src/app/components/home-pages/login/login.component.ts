import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showProgressSpinner: boolean;
  invalidcred: boolean;
  socket: any;
  signBtnpress: boolean;
  verificationWindow: boolean;
  emailVerifiactionOn: boolean;

  constructor(private api: ApiServiceService, private fb: FormBuilder, private router: Router) {
    this.socket = io('https://sleepy-coast-01684.herokuapp.com/');
  }

  ngOnInit() {
    this.showProgressSpinner = false;
    this.signBtnpress = false;
    this.verificationWindow = false;
    this.emailVerifiactionOn = false;
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
      this.signBtnpress = true;
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
            this.signBtnpress = false;
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

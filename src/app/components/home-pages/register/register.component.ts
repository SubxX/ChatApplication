import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../../../Api Methods/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailexists = false;
  isRegSuccess = false; // is register success
  showProgressspinner = false; // is progressbar shown
  regBtnDisabled = false; // is register button shown
  registerForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private api: ApiServiceService) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  userRegister() {
    if (this.registerForm.status === 'VALID') {
      this.registerForm.disable();
      this.showProgressspinner = true;
      this.regBtnDisabled = true;
      this.api.registerUser(this.registerForm.value)
        .subscribe(
          (res) => {
            sessionStorage.setItem('email', this.registerForm.value.email);
            this.showProgressspinner = false;
            this.isRegSuccess = true;
          },
          (err) => {
            this.emailexists = true;
            this.regBtnDisabled = false;
            this.showProgressspinner = false;
            this.registerForm.enable();
            setTimeout(() => {
              this.emailexists = false;
            }, 3000);
          }
        );
    } else {
      console.log(this.registerForm);
    }
  }

  regesterOnEnterKey(e) {
    if (e.keyCode === 13 && this.registerForm.status === 'VALID') {
      this.userRegister();
    } else {
      return false;
    }
  }

}

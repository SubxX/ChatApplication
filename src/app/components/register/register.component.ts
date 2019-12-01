import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../../Api Methods/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordType = 'password'; // passwordtype
  emailexists;
  isRegSuccess = false; // is register success
  showProgressbar = false; // is progressbar shown
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
      this.showProgressbar = true;
      this.regBtnDisabled = true;
      this.api.registerUser(this.registerForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            this.showProgressbar = false;
            this.isRegSuccess = true;
          },
          (err) => {
            this.emailexists = 'email already in use';
            this.regBtnDisabled = false;
            this.showProgressbar = false;
            this.registerForm.enable();
          }
        );
    } else {
      console.log(this.registerForm);
    }

  }

}

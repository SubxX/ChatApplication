import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordType = 'password'; //passwordtype
  isShow = false; //is password shown
  isDisabled = false; //is password shown disabled

  isRegSuccess = false; //is register success
  showProgressbar = false; //is progressbar shown

  registerForm: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    });
  }

  togglePass() {
    if (this.isShow === false) {
      this.passwordType = 'text';
      this.isShow = true;
    } else {
      this.passwordType = 'password';
      this.isShow = false;
    }
  }

  userRegister() {
    if (this.registerForm.status === 'VALID') {
      console.log(this.registerForm.value);
      this.registerForm.disable();
      this.isDisabled =true;
      this.showProgressbar= true;
      this.isRegSuccess = true;
    } else {
      console.log(this.registerForm);
    }
  }

  registerFormValidationstatus(){
    if(this.registerForm.status == 'INVALID'){
      return true;
    }else{
      return false;
    }
  }
}

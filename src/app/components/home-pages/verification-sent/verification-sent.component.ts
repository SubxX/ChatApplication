import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-sent',
  templateUrl: './verification-sent.component.html',
  styleUrls: ['./verification-sent.component.css']
})
export class VerificationSentComponent implements OnInit {
  email;
  codeValue = '';
  isSuccess = false;
  err: string;
  disablBTN = true;
  count: any;
  constructor(private api: ApiServiceService, private route: Router) { }

  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    this.counter();
  }

  counter() {
    this.count = 60;
    const interval = setInterval(() => {
      this.count = this.count - 1;
      if (this.count === 0) {
        this.disablBTN = false;
        clearInterval(interval);
        return;
      }
    }, 1000);
  }
  confirmEmail() {
    const objBody = { email: this.email, emailValid: this.codeValue.toUpperCase() };
    this.api.confirmEmail(objBody).subscribe(
      (res) => {
        this.isSuccess = true;
        sessionStorage.clear();
        setTimeout(() => {
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.route.navigate(['/login']));
        }, 3000);
      },
      (err) => {
        this.err = 'INVALID';
        setTimeout(() => {
          this.err = '';
        }, 4000);
      }
    );
  }
  enterKey(e) {
    if (e.keyCode === 13 && this.codeValue.length === 6) {
      this.confirmEmail();
    } else {
      return false;
    }
  }
  resendCodetoEmail() {
    this.api.resendVerificationCode(this.email)
      .subscribe(
        (data) => {
          this.disablBTN = true;
          this.counter();
        },
        (err) => {
          console.log(err);
        });
  }

}

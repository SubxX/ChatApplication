import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-sent',
  templateUrl: './verification-sent.component.html',
  styleUrls: ['./verification-sent.component.css']
})
export class VerificationSentComponent implements OnInit {
  @Input() email;
  codeValue = '';
  isSuccess = false;
  err = '';
  constructor(private api: ApiServiceService, private route: Router) { }

  ngOnInit() {
  }

  confirmEmail() {
    const objBody = { email: this.email, emailValid: this.codeValue.toUpperCase() };
    this.api.confirmEmail(objBody).subscribe(
      (res) => {
        this.isSuccess = true;
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 3000);
      },
      (err) => {
        this.err = 'INVALID';
        console.log('failed');
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

}

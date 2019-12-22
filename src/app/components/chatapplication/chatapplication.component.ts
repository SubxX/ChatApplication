import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Api Methods/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatapplication',
  templateUrl: './chatapplication.component.html',
  styleUrls: ['./chatapplication.component.css']
})
export class ChatapplicationComponent implements OnInit {
  msgdata = '';
  currentUser = { name: '', email: '' };
  constructor(private api: ApiServiceService, private router: Router) { }

  ngOnInit() {
    this.initLoggedUser();
  }

  initLoggedUser() {
    this.api.getUserFromToken()
      .subscribe(
        (user) => {
          this.currentUser = user;
        },
        (err) => {
          console.log('user not loggedin');
          this.router.navigate(['']);
        }
      );
  }
  logout() {
    this.api.removeToken();
    this.router.navigate(['']);
  }
  send() {
    console.log(this.msgdata);
    this.msgdata = '';
  }

}

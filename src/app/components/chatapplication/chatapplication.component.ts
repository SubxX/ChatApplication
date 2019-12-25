import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Api Methods/api-service.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chatapplication',
  templateUrl: './chatapplication.component.html',
  styleUrls: ['./chatapplication.component.css']
})
export class ChatapplicationComponent implements OnInit {
  msgdata = '';
  currentUser = { _id: '', name: '', email: '' };
  onlineUsers = [];
  messages = [];
  socket;
  constructor(private api: ApiServiceService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.initLoggedUser();
    this.getOnlineUsers();
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
  getOnlineUsers() {
    this.api.getAllOnlineUsers()
      .subscribe(
        (data) => { this.onlineUsers = data; },
        (err) => { console.log('something went wrong'); }
      );
  }
  userChanged() {
    this.socket.emit('refreshComponent', {});
  }
  logout() {
    this.api.removeToken();
    this.router.navigate(['']);
  }
}

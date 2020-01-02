import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit {
  receiverId;
  senderId;
  currentUser = { _id: '', name: '' };
  receiverUser = { _id: '', name: '' };
  messages = [];
  socket;
  msgData;

  constructor(private api: ApiServiceService, private router: Router, private activetedroute: ActivatedRoute) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.receiverId = this.activetedroute.snapshot.params.receiver;
    this.senderId = this.activetedroute.snapshot.params.sender;
    this.getMessages();
    this.initLoggedUser();
    this.getTheReceiverDetails();

    this.socket.on('refreshPage', (data) => {
      this.receiverId = this.activetedroute.snapshot.params.receiver;
      this.senderId = this.activetedroute.snapshot.params.sender;
      this.getMessages();
      this.getTheReceiverDetails();
    });
    this.socket.on('refreshChat', (data) => {
      this.getMessages();
    });
  }

  // init loggedin user
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
  // fetch messages on given user
  getMessages() {
    this.api.getMessages(this.senderId, this.receiverId)
      .subscribe(
        (data) => {
          this.messages = data;
        },
        (err) => {
          console.log('something went wrong in getting messages');
        }
      );
  }
  // getting the receiver details from the route paramater
  getTheReceiverDetails() {
    this.api.getUserDetailsbyId(this.receiverId)
      .subscribe(
        (data) => {
          this.receiverUser = data;
        },
        (err) => {
          console.log('something went wrong when getting the receiver user data');
        }
      );
  }

  // Send message
  sendMessage() {
    if (this.msgData) {
      const smsBody = {
        sendername: this.currentUser.name,
        senderId: this.currentUser._id,
        receivername: this.receiverUser.name,
        receiverId: this.receiverUser._id,
        msg: this.msgData
      };
      this.api.sendMessage(smsBody)
        .subscribe(
          (data) => {
            this.socket.emit('msgrefresh', {});
          },
          (err) => {
            console.log(err);
            console.log('somethign went wrong while sending messages');
          }
        );
      this.msgData = '';
    } else {
      console.log('cannot post empty data');
    }
  }

  // Send message using Enter
  enterKey(e) {
    if (e.which === 13) {
      this.sendMessage();
    } else {
      return false;
    }
  }

}

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
  receiverUser = { _id: '', name: '', profilepic: '', loginstatus: Boolean, email: String };
  messages = [];
  socket;
  msgData;
  rpMSGWindow = false;
  rpBody;
  rpDate;
  rpId;
  init = false;
  Loadvalue = 0;
  constructor(private api: ApiServiceService, private router: Router, private activetedroute: ActivatedRoute) {
    this.socket = io('https://sleepy-coast-01684.herokuapp.com/');
  }

  ngOnInit() {
    this.initLoggedUser()
      .then((data) => {
        this.Loadvalue = 100; setTimeout(() => {
          this.init = true;
        }, 1000);
      })
      .catch((err) => { this.router.navigate(['']); });
    this.activetedroute.params.subscribe((params) => {
      this.receiverId = params.receiver;
      this.senderId = params.sender;
      this.closerpMsg();
      this.getMessages();
      this.getTheReceiverDetails();
    });
    this.socket.on('refreshChat', (data) => {
      this.getMessages();
    });
  }


  // update active chat user
  addOrUpdateActiveChat(senderId, receiverEmail) {
    this.api.addOrUpdateActiveChatUser(senderId, receiverEmail)
      .subscribe(
        (data) => { return; },
        (err) => { console.log(err); }
      );
  }
  // init loggedin user
  initLoggedUser() {
    return new Promise((resolve, reject) => {
      this.api.getUserFromToken()
        .subscribe(
          (user) => {
            this.currentUser = user;
            resolve();
          },
          (err) => {
            console.log('user not loggedin');
            reject();
          }
        );
    });
  }
  // fetch messages on given user
  getMessages() {
    this.api.getMessages(this.senderId, this.receiverId)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.messages = data;
          } else {
            this.messages = [];
          }
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
          this.addOrUpdateActiveChat(this.currentUser._id, this.receiverUser.email);
        },
        (err) => {
          console.log('something went wrong when getting the receiver user data');
        }
      );
  }

  // Send message
  async sendMessage() {
    if (this.msgData) {
      const smsBody = await this.generatemsgBody();
      this.api.sendMessage(smsBody)
        .subscribe(
          (data) => {
            this.closerpMsg();
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
  // Message options
  replyMsg(msg) {
    this.rpBody = msg.msgBody;
    this.rpDate = msg.date;
    this.rpId = msg._id;
    this.rpMSGWindow = true;
  }
  closerpMsg() {
    this.rpBody = '';
    this.rpDate = '';
    this.rpId = '';
    this.rpMSGWindow = false;
  }
  pinMsg(msg) {
    console.log(msg);
  }
  deleteMsg(msg) {
    this.api.deleteMessage(msg._id)
      .subscribe(
        (data) => { this.getMessages(); },
        (err) => {
          console.log(err);
        }
      );
  }

  async generatemsgBody() {
    let smsBody;
    if (this.rpId) {
      smsBody = await {
        sendername: this.currentUser.name,
        senderId: this.currentUser._id,
        receivername: this.receiverUser.name,
        receiverId: this.receiverUser._id,
        msg: this.msgData,
        reference: this.rpId
      };
    } else {
      smsBody = await {
        sendername: this.currentUser.name,
        senderId: this.currentUser._id,
        receivername: this.receiverUser.name,
        receiverId: this.receiverUser._id,
        msg: this.msgData
      };
    }
    return smsBody;
  }

}

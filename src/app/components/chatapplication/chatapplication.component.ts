import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Api Methods/api-service.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { User, Profileconfig } from '../../models/interfaces';
import { ProfileconfigService } from '../../Observables/profileconfigobservable/profileconfig.service';
import { CurrentuserService } from '../../Observables/currentUserObservable/currentuser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-chatapplication',
  templateUrl: './chatapplication.component.html',
  styleUrls: ['./chatapplication.component.css']
})
export class ChatapplicationComponent implements OnInit {
  load = 0;
  msgdata = '';
  onlineUsers = [];
  messages = [];
  socket;
  searchData;
  filterUser = [];
  profilePic;
  status = 'ONLINE';
  isConnected = true;
  loadText;
  cfgData: Observable<Profileconfig>;
  ActiveUser: Observable<User>;
  profilepic: Observable<string>;
  userId: string;
  constructor(private api: ApiServiceService, private router: Router, private cnfg: ProfileconfigService, private cu: CurrentuserService) {
    this.socket = io('https://sleepy-coast-01684.herokuapp.com/');
    this.cfgData = this.cnfg.config.pipe(map(data => data));
    this.ActiveUser = this.cu.liUser.pipe(map((data) => { this.userId = data._id; return data; }));
    this.profilepic = this.cu.profilepicOBS.pipe(map(data => data));
  }

  ngOnInit() {
    this.router.navigate(['/chatapplication/welcome']);
    this.initLoggedUserPromise();
    this.cu.getUser();
    this.cu.getUserProfilepic();
    this.socket.on('refreshStatus', (data) => {
      if (localStorage.getItem('authtoken')) {
        this.getOnlineUsers();
      }
    });
  }

  initLoggedUserPromise() {
    this.cnfg.getProfileConfig().then(() => {
      this.load = this.load + 50;
      this.getOnlineUsers().then(() => {
        this.load = this.load + 50;
      });
    });
  }


  updateActiveChat() {
    this.api.addOrUpdateActiveChatUser(this.userId, 'null')
      .subscribe(
        (data) => { },
        (err) => { console.log(err); }
      );
    this.slideLeftBar('remove');
  }


  getOnlineUsers() {
    return new Promise((resolve, reject) => {
      this.api.getAllOnlineUsers()
        .subscribe(
          (data) => {
            this.onlineUsers = data;
            this.loadText = 'initilizing other users....';
            this.globalSetTimeOut(2000, resolve);
          },
          (err) => {
            console.log('something went wrong');
            reject();
          }
        );
    });
  }
  userChanged() {
    this.filterUser = [];
    this.searchData = '';
    this.slideLeftBar('remove');
  }
  logout() {
    this.updateActiveChat();
    this.api.logout(this.userId)
      .subscribe(
        (data) => {
          this.socket.emit('refreshStatus', {});
        },
        (err) => { console.log(err); }
      );
    this.api.removeToken();
    this.router.navigate(['']);
  }
  searchUser() {
    if (this.searchData !== undefined) {
      this.filterUser = this.onlineUsers.filter((item) => {
        const reg = new RegExp(this.searchData, 'ig');
        if (item.name.match(reg)) {
          return true;
        }
        return false;
      });
    } else {
      return false;
    }
  }

  globalSetTimeOut(time, resolve) {
    setTimeout(() => {
      resolve();
    }, time);
  }
  slideLeftBar(act) {
    act === 'toggle' ? document.querySelector('.left-side').classList.toggle('slide') :
      document.querySelector('.left-side').classList.remove('slide');
  }
}

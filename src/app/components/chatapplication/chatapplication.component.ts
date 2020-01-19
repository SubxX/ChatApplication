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
  load = 0;
  msgdata = '';
  currentUser = {
    _id: '',
    name: '',
    email: '',
    nickname: '',
    password: '',
    profileconfig: {
      nicknametop: Boolean,
      searchbar: Boolean,
      latestupdates: Boolean
    }
  };
  userConfig = {
    nicknametop: Boolean,
    searchbar: Boolean,
    latestupdates: Boolean
  };
  onlineUsers = [];
  messages = [];
  socket;
  searchData;
  filterUser = [];
  profilePic;
  status = 'ONLINE';
  isConnected = true;
  loadText;
  constructor(private api: ApiServiceService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.initLoggedUserPromise();

    this.socket.on('upProfilePic', (data) => {
      this.initUserProfilePic();
    });
    this.socket.on('refreshConfig', (data) => {
      this.updateProfileConfig();
    });
    this.socket.on('refreshStatus', (data) => {
      if (localStorage.getItem('authtoken')) {
        this.getOnlineUsers();
      }
    });
  }

  initLoggedUserPromise() {
    this.initLoggedUser().then(() => {
      this.load = this.load + 50;
      this.getOnlineUsers().then(() => {
        this.load = this.load + 30;
        this.initUserProfilePic().then(() => {
          this.load = this.load + 20;
        });
      });
    });
  }


  updateActiveChat() {
    this.api.addOrUpdateActiveChatUser(this.currentUser._id, 'null')
      .subscribe(
        (data) => { },
        (err) => { console.log(err); }
      );
  }

  initLoggedUser() {
    return new Promise((resolve, reject) => {
      this.api.getUserFromToken()
        .subscribe(
          (user) => {
            this.currentUser = user;
            this.userConfig = {
              nicknametop: this.currentUser.profileconfig.nicknametop,
              searchbar: this.currentUser.profileconfig.searchbar,
              latestupdates: this.currentUser.profileconfig.latestupdates
            };
            this.router.navigate(['/chatapplication/welcome']);
            this.loadText = 'Initilizing Logged in User...';
            this.globalSetTimeOut(2000, resolve);
          },
          (err) => {
            console.log('user not loggedin');
            this.router.navigate(['']);
            reject();
          }
        );
    });
  }
  updateProfileConfig() {
    this.api.getaProfileConfig(this.currentUser._id)
      .subscribe(
        (data) => { this.userConfig = data; },
        (err) => { console.log(err); }
      );
  }
  initUserProfilePic() {
    return new Promise((resolve, reject) => {
      this.api.getProfilePicture()
        .subscribe(
          (data) => {
            this.profilePic = 'data:image/png;base64,' + data;
            this.loadText = 'Loaded profile Picture...';
            this.globalSetTimeOut(2000, resolve);
          },
          (err) => {
            this.profilePic = '';
            this.loadText = 'No Profile Picture Found Loding Default...';
            this.globalSetTimeOut(2000, resolve);
          }
        );
    });
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
  }
  logout() {
    this.updateActiveChat();
    this.api.logout(this.currentUser._id)
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
        if (item.name.trim().toLowerCase() !== this.searchData.trim().toLowerCase()) {
          return false;
        }
        return true;
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

}

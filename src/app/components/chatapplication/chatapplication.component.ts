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
  constructor(private api: ApiServiceService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.initLoggedUser();
    this.getOnlineUsers();
    this.initUserProfilePic();
    this.socket.on('upProfilePic', (data) => {
      this.initUserProfilePic();
    });
    this.socket.on('refreshConfig', (data) => {
      this.updateProfileConfig();
    });
  }

  initLoggedUser() {
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
        },
        (err) => {
          console.log('user not loggedin');
          this.router.navigate(['']);
        }
      );
  }
  updateProfileConfig() {
    this.api.getaProfileConfig(this.currentUser._id)
      .subscribe(
        (data) => { this.userConfig = data; },
        (err) => { console.log(err); }
      );
  }
  initUserProfilePic() {
    this.api.getProfilePicture()
      .subscribe(
        (data) => {
          this.profilePic = 'data:image/png;base64,' + data;
        },
        (err) => {
          this.profilePic = '';
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
    this.filterUser = [];
    this.searchData = '';
  }
  logout() {
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

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilEditForm;
  isVisible = false;
  profilepic;
  currentUser = {
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
  socket;

  nicknametop;
  searchbar;
  latestupdates;

  constructor(private fb: FormBuilder, private api: ApiServiceService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.initLoggedUser();
    this.profileEditFormInit();
    this.initUserProfilePic();
  }

  profileEditFormInit() {
    this.profilEditForm = this.fb.group({
      name: [''],
      email: [''],
      nickname: [''],
      password: [''],
      newpassword: [''],
    });
  }

  async changeProfilepic(e) {
    const formData = new FormData();
    const file = e.target.files[0];
    await formData.append('profilepic', file);
    this.api.updateProfilePicture(formData)
      .subscribe(
        (data) => {
          this.profilepic = 'data:image/png;base64,' + data;
          console.log('done');
          this.socket.emit('refreshProfilePic', {});
        },
        (err) => {
          console.log(err);
        }
      );
  }
  saveChanges() {
    this.profilEditForm.controls.email.enable();
    this.api.updateUser(this.profilEditForm.value)
      .subscribe(
        (data) => {
          this.profilEditForm.controls.email.disable();
          console.log(data);
          setTimeout(() => {
            this.api.removeToken();
            this.router.navigate(['']);
          }, 2000);
        },
        (err) => { console.log(err); this.profilEditForm.controls.email.disable(); }
      );
  }

  initLoggedUser() {
    this.api.getUserFromToken()
      .subscribe(
        (user) => {
          this.currentUser = user;
          this.populateEditForm();
          this.nicknametop = this.currentUser.profileconfig.nicknametop;
          this.searchbar = this.currentUser.profileconfig.searchbar;
          this.latestupdates = this.currentUser.profileconfig.latestupdates;
        },
        (err) => {
          console.log('user not loggedin');
          this.router.navigate(['']);
        }
      );
  }
  initUserProfilePic() {
    this.api.getProfilePicture()
      .subscribe(
        (data) => { this.profilepic = 'data:image/png;base64,' + data; },
        (err) => { this.profilepic = ''; }
      );
  }
  populateEditForm() {
    this.profilEditForm.controls.name.setValue(this.currentUser.name);
    this.profilEditForm.controls.nickname.setValue(this.currentUser.nickname);
    this.profilEditForm.controls.email.setValue(this.currentUser.email);
    this.profilEditForm.controls.email.disable();
  }
  toogleVisibility() {
    this.isVisible = !this.isVisible;
  }
  updateConfig() {
    const userConfig = {
      nicknametop: this.nicknametop,
      searchbar: this.searchbar,
      latestupdates: this.latestupdates
    };
    this.api.updateProfileConfig(userConfig)
      .subscribe(
        (data) => {
          this.socket.emit('refreshConfig', {});
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

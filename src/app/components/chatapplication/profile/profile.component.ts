import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../../../Api Methods/api-service.service';
import { Router } from '@angular/router';
import { User, Profileconfig } from '../../../models/interfaces';
import { ProfileconfigService } from '../../../Observables/profileconfigobservable/profileconfig.service';
import { CurrentuserService } from '../../../Observables/currentUserObservable/currentuser.service';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profilEditForm: FormGroup;
  profilepic: Observable<string>;
  currentUser: Observable<User>;
  cfgData: Observable<Profileconfig>;
  isVisible = false;
  nicknametop;
  searchbar;
  latestupdates;
  constructor(
    private fb: FormBuilder, private api: ApiServiceService,
    private router: Router, private cnfg: ProfileconfigService,
    private cu: CurrentuserService) {
  }

  ngOnInit() {
    this.cfgData = this.cnfg.config.pipe(map((data) => {
      this.nicknametop = data.nicknametop;
      this.searchbar = data.searchbar;
      this.latestupdates = this.latestupdates;
      return data;
    }));
    this.profilepic = this.cu.profilepicOBS.pipe(
      map((data: string) => data)
    );
    this.currentUser = this.cu.liUser.pipe(map((data) => {
      setTimeout(() => { this.populateEditForm(data.name, data.nickname, data.email); }, 0);
      return data;
    }));
    this.profileEditFormInit();
  }
  ngAfterViewInit() {

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

  async changeProfilepic(e) {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.cu.updateUserProfilepic({ file: reader.result });
    };

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
  populateEditForm(name, nickname, email) {
    this.profilEditForm.controls.name.setValue(name);
    this.profilEditForm.controls.nickname.setValue(nickname);
    this.profilEditForm.controls.email.setValue(email);
    this.profilEditForm.controls.email.disable();
  }
  updateConfig() {
    this.cnfg.updateProfileConfig({ nicknametop: this.nicknametop, searchbar: this.searchbar, latestupdates: this.latestupdates });
  }
}

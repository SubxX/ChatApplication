import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, initUserData, apiLink } from '../../models/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(initUserData);
  private profilePic: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public liUser = this.currentUser.asObservable();
  public profilepicOBS = this.profilePic.asObservable();
  public userData: User;
  constructor(private http: HttpClient, private router: Router) {
  }

  getUser() {
    this.http.get<any>(apiLink + 'login/getuserfromtoken')
      .subscribe(
        (data: User) => { this.currentUser.next(data); this.userData = data; },
        (err) => { this.router.navigate(['']); }
      );
  }

  getUserProfilepic() {
    this.http.get<any>(apiLink + 'login/getprofilepic')
      .subscribe(
        (data) => { this.profilePic.next(data); },
        (err) => { this.profilePic.next(''); }
      );
  }
  updateUserProfilepic(body) {
    this.http.post<any>(apiLink + 'login/uploadprofilepic', body)
      .subscribe(
        (data) => {
          this.profilePic.next(data);
          this.currentUser.next({ ...this.userData, profilepic: 'it is hrere ahahaa' });
        },
        (err) => { this.profilePic.next(''); }
      );
  }

}

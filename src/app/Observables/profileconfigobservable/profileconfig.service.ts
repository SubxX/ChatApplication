import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profileconfig, initUserData, apiLink } from '../../models/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileconfigService {
  private userConfig: BehaviorSubject<Profileconfig> = new BehaviorSubject<Profileconfig>(initUserData.profileconfig);
  public config = this.userConfig.asObservable();
  constructor(private http: HttpClient) {
  }

  public getProfileConfig() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(apiLink + 'login/getaProfileConfig').subscribe(
        (data) => { this.userConfig.next(data); resolve(); },
        (err) => { console.log(err); reject(); }
      );
    });
  }
  public updateProfileConfig(body) {
    this.http.post<any>(apiLink + 'login/changeProfileConfig', body).subscribe(
      (data) => { this.userConfig.next(data); },
      (err) => { console.log(err); }
    );
  }

}

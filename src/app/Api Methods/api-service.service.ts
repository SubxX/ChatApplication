import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiLink = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }
  // for registration
  registerUser(obj) {
    return this.http.post<any>(this.apiLink + 'register', obj);
  }
  // for confirming email
  confirmEmail(obj) {
    return this.http.post<any>(this.apiLink + 'register/verification', obj);
  }
  // for login
  login(obj) {
    return this.http.post<any>(this.apiLink + 'login', obj);
  }
  // for checking token available or not
  isTokenAvailable() {
    return !!localStorage.getItem('authtoken');
  }
  // for getting the token value
  getToken() {
    return localStorage.getItem('authtoken');
  }
  // for removing the token
  removeToken() {
    localStorage.removeItem('authtoken');
  }
  // for getting the user from Token
  getUserFromToken() {
    return this.http.get<any>(this.apiLink + 'login/getuserfromtoken');
  }
  // get All Online users
  getAllOnlineUsers() {
    return this.http.get<any>(this.apiLink + 'login/getOnlineUsers');
  }
  getMessages(sender, receiver) {
    return this.http.get<any>(this.apiLink + 'chat/getmessages/' + sender + '/' + receiver);
  }
  sendMessage(obj) {
    return this.http.post<any>(this.apiLink + 'chat', obj);
  }
  getUserDetailsbyId(id) {
    return this.http.get<any>(this.apiLink + 'login/getaUserByid/' + id);
  }
  getProfilePicture() {
    return this.http.get<any>(this.apiLink + 'login/getprofilepic');
  }
  updateProfilePicture(body) {
    return this.http.post<any>(this.apiLink + 'login/uploadprofilepic', body);
  }

}

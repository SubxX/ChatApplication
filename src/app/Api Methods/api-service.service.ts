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
  logout(id) {
    return this.http.get<any>(this.apiLink + 'login/logout/' + id);
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
  // to get Message
  getMessages(sender, receiver) {
    return this.http.get<any>(this.apiLink + 'chat/getmessages/' + sender + '/' + receiver);
  }
  // to Send Message
  sendMessage(obj) {
    return this.http.post<any>(this.apiLink + 'chat', obj);
  }
  // Delete a Message
  deleteMessage(id) {
    return this.http.get<any>(this.apiLink + 'chat/deleteMsg/' + id);
  }
  // get a users details from ID
  getUserDetailsbyId(id) {
    return this.http.get<any>(this.apiLink + 'login/getaUserByid/' + id);
  }
  // get a users profile picture
  getProfilePicture() {
    return this.http.get<any>(this.apiLink + 'login/getprofilepic');
  }
  // update a users profile picture
  updateProfilePicture(body) {
    return this.http.post<any>(this.apiLink + 'login/uploadprofilepic', body);
  }
  // to Update a users profile config
  updateProfileConfig(body) {
    return this.http.post<any>(this.apiLink + 'login/changeProfileConfig', body);
  }
  // Getting a particular users profile config
  getaProfileConfig(id) {
    return this.http.get<any>(this.apiLink + 'login/getaProfileConfig/' + id);
  }
  // For adding Active chat person
  addOrUpdateActiveChatUser(sender, receiverMail) {
    return this.http.get<any>(this.apiLink + 'login/addActiveChatUser/' + sender + '/' + receiverMail);
  }
  resendVerificationCode(email) {
    return this.http.get<any>(this.apiLink + 'register/resend/' + email);
  }
}

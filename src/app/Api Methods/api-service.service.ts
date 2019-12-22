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

}

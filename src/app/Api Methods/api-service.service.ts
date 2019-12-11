import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiLink = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  registerUser(obj) {
    return this.http.post<any>(this.apiLink + 'register', obj);
  }
  confirmEmail(obj) {
    return this.http.post<any>(this.apiLink + 'register/verification', obj);
  }
}

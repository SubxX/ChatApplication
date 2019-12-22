import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiServiceService } from '../Api Methods/api-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  result;
  constructor(private router: Router, private api: ApiServiceService) { }
  canActivate() {
    if (this.api.isTokenAvailable()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './Api Methods/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private api: ApiServiceService, private router: Router) { }
  ngOnInit() {
    this.getTokenAvailibility();
  }

  getTokenAvailibility() {
    if (this.api.isTokenAvailable()) {
      this.router.navigate(['/chatapplication']);
    }
  }

}

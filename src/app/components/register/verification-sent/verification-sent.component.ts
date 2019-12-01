import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-verification-sent',
  templateUrl: './verification-sent.component.html',
  styleUrls: ['./verification-sent.component.css']
})
export class VerificationSentComponent implements OnInit {
  @Input() email;
  constructor() { }

  ngOnInit() {
  }

}

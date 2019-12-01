import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationSentComponent } from './verification-sent.component';

describe('VerificationSentComponent', () => {
  let component: VerificationSentComponent;
  let fixture: ComponentFixture<VerificationSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

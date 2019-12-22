import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatapplicationComponent } from './chatapplication.component';

describe('ChatapplicationComponent', () => {
  let component: ChatapplicationComponent;
  let fixture: ComponentFixture<ChatapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMChatroomComponent } from './dm-chatroom.component';

describe('DMChatroomComponent', () => {
  let component: DMChatroomComponent;
  let fixture: ComponentFixture<DMChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMChatroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

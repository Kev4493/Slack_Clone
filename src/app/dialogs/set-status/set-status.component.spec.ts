import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetStatusComponent } from './set-status.component';

describe('SetStatusComponent', () => {
  let component: SetStatusComponent;
  let fixture: ComponentFixture<SetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

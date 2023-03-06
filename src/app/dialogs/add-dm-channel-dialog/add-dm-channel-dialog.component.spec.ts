import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDmChannelDialogComponent } from './add-dm-channel-dialog.component';

describe('AddDmChannelDialogComponent', () => {
  let component: AddDmChannelDialogComponent;
  let fixture: ComponentFixture<AddDmChannelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDmChannelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDmChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

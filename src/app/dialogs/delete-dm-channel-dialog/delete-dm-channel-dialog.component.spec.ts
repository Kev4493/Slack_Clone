import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDmChannelDialogComponent } from './delete-dm-channel-dialog.component';

describe('DeleteDmChannelDialogComponent', () => {
  let component: DeleteDmChannelDialogComponent;
  let fixture: ComponentFixture<DeleteDmChannelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDmChannelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDmChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

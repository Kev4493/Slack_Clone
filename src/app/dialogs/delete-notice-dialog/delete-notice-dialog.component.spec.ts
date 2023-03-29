import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoticeDialogComponent } from './delete-notice-dialog.component';

describe('DeleteNoticeDialogComponent', () => {
  let component: DeleteNoticeDialogComponent;
  let fixture: ComponentFixture<DeleteNoticeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNoticeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

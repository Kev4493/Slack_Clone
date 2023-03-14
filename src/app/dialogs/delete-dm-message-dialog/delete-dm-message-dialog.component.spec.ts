import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDmMessageDialogComponent } from './delete-dm-message-dialog.component';

describe('DeleteDmMessageDialogComponent', () => {
  let component: DeleteDmMessageDialogComponent;
  let fixture: ComponentFixture<DeleteDmMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDmMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDmMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

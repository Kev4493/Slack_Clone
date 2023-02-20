import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMessageDialogComponent } from './delete-message-dialog.component';

describe('DeleteMessageDialogComponent', () => {
  let component: DeleteMessageDialogComponent;
  let fixture: ComponentFixture<DeleteMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMessageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

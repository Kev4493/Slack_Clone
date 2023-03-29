import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-notice-dialog',
  templateUrl: './delete-notice-dialog.component.html',
  styleUrls: ['./delete-notice-dialog.component.scss']
})
export class DeleteNoticeDialogComponent {

  constructor(public dialog: MatDialog) { }

  closeDialog() {
    this.dialog.closeAll();
  }

}

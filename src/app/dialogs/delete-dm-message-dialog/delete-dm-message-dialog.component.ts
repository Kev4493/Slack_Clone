import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DmMessagesService } from 'src/app/services/dm-messages.service';

@Component({
  selector: 'app-delete-dm-message-dialog',
  templateUrl: './delete-dm-message-dialog.component.html',
  styleUrls: ['./delete-dm-message-dialog.component.scss']
})
export class DeleteDmMessageDialogComponent {

  constructor(public dialog: MatDialog, public dmMessagesService: DmMessagesService) { }

  closeDialog() {
    this.dmMessagesService.messageId = '';
    this.dmMessagesService.messageFromUserId = '';
    this.dialog.closeAll();
  }

}

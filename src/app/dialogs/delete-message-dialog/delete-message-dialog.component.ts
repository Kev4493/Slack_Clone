import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-delete-message-dialog',
  templateUrl: './delete-message-dialog.component.html',
  styleUrls: ['./delete-message-dialog.component.scss']
})
export class DeleteMessageDialogComponent {

  constructor(public dialog: MatDialog, public authService: AuthService, public messageService: MessageService) { }


  closeDialog() {
    this.messageService.messageId = '';
    this.messageService.messageFromUserId = '';
    this.dialog.closeAll();
  }
}

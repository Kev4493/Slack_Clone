import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';


@Component({
  selector: 'app-delete-channel-dialog',
  templateUrl: './delete-channel-dialog.component.html',
  styleUrls: ['./delete-channel-dialog.component.scss']
})
export class DeleteChannelDialogComponent {

  constructor(public dialog: MatDialog, public channelService: ChannelService) { }

  closeDeleteChannelDialog() {
    this.dialog.closeAll();
  }
}

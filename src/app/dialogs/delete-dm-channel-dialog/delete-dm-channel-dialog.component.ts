import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-delete-dm-channel-dialog',
  templateUrl: './delete-dm-channel-dialog.component.html',
  styleUrls: ['./delete-dm-channel-dialog.component.scss']
})
export class DeleteDmChannelDialogComponent {

  constructor(public dialog: MatDialog, public channelService: ChannelService, public dmChannelService: DmChannelService) { } 

  closeDeleteDmChannelDialog() {
    this.dialog.closeAll();
  }
}

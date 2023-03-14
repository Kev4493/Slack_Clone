import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDmChannelDialogComponent } from 'src/app/dialogs/add-dm-channel-dialog/add-dm-channel-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';

@Component({
  selector: 'app-dm-channels',
  templateUrl: './dm-channels.component.html',
  styleUrls: ['./dm-channels.component.scss']
})
export class DmChannelsComponent {


  constructor(public dialog: MatDialog, public authService: AuthService, public dmChannelService: DmChannelService) { }


  ngOnInit() {
    this.dmChannelService.getAllDmChannels();
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }


  getUserActivityStatus(userId: string) {
    const user = this.authService.allUsersFromDb.find(u => u.userId === userId);
    return user ? user.userActivityStatus : '';
  }


}

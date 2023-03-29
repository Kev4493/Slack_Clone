import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  allDmChannels = [];


  constructor(public dialog: MatDialog, public authService: AuthService, public dmChannelService: DmChannelService, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.getAllDmChannels();
  }


  getAllDmChannels() {
    this.firestore
      .collection('directMessageChannels', ref => ref.where('memberIds', 'array-contains', this.authService.currentLoggedInUserId))
      .valueChanges({ idField: 'dmChannelId' })
      .subscribe((changes: any) => {
        this.allDmChannels = changes.map((dmChannel: any) => {
          const otherUserId = dmChannel.memberIds.find((userId: string) => userId !== this.authService.currentLoggedInUserId);
          return { dmChannelId: dmChannel.dmChannelId, otherUserId: otherUserId };
        });
      })
  }


  getUsernameById(otherUserId) {
    let user = this.authService.allUsersFromDb.find(obj => obj.userId === otherUserId);

    if (user) {
      let userName = user.userName;
      return userName;
    } else {
      console.log("otherUserId not found");
    }
  }


  getUserColorById(otherUserId) {
    let user = this.authService.allUsersFromDb.find(obj => obj.userId === otherUserId);

    if (user) {
      let userColor = user.userColor;
      return userColor;
    } else {
      console.log("otherUserId not found");
    }
  }


  getUserInitialsById(otherUserId) {
    let user = this.authService.allUsersFromDb.find(obj => obj.userId === otherUserId);

    if (user) {
      let userName = user.userName;
      let initials = userName.split(' ').map(name => name[0]).join('');
      return initials;
    } else {
      console.log("otherUserId not found");
    }
  }


  getUserActivityStatusById(otherUserId) {
    let user = this.authService.allUsersFromDb.find(obj => obj.userId === otherUserId);

    if (user) {
      let userActivityStatus = user.userActivityStatus;
      return userActivityStatus;
    } else {
      console.log("otherUserId not found");
    }
  }


  getStatusEmojiById(otherUserId) {
    let user = this.authService.allUsersFromDb.find(obj => obj.userId === otherUserId);

    if (user) {
      let userStatusEmoji = user.userStatusEmoji;
      return userStatusEmoji;
    } else {
      console.log("otherUserId not found");
    }
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }


  getUserActivityStatus(userId: string) {
    const user = this.authService.allUsersFromDb.find(u => u.userId === userId);
    return user ? user.userActivityStatus : '';
  }
}

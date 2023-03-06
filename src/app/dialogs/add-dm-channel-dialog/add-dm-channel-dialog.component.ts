import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DmChannel } from 'src/models/dm-channel.class';

@Component({
  selector: 'app-add-dm-channel-dialog',
  templateUrl: './add-dm-channel-dialog.component.html',
  styleUrls: ['./add-dm-channel-dialog.component.scss']
})
export class AddDmChannelDialogComponent {

  dmChannel = new DmChannel;
  selectedDmUser: any;

  constructor(public dialog: MatDialog, public authService: AuthService, private firestore: AngularFirestore) { }


  addDmChannel() {
    console.log('selected user: ', this.selectedDmUser);
    this.addDmChannelToDb();
    this.closeDialog();
  }


  generateObject() {
    // this.dmChannel.members = [
    //   { userId: this.selectedDmUser.userId, userName: this.selectedDmUser.userName },
    //   { userId: this.authService.user.userId, userName: this.authService.user.userName }
    // ];
    
    this.dmChannel.memberNames = [this.selectedDmUser.userName, this.authService.user.userName]
    this.dmChannel.memberIds = [this.selectedDmUser.userId, this.authService.user.userId]
    console.log('DMChannelObject: ', this.dmChannel);
  }


  addDmChannelToDb() {
    this.generateObject();

    this.firestore
      .collection('directMessageChannels')
      .add(this.dmChannel.toJSON())
  }


  closeDialog() {
    this.dialog.closeAll();
  }
}

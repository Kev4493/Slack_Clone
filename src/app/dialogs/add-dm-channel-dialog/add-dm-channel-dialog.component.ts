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
    this.addDmChannelToDb();
    this.closeDialog();
  }


  generateObject() {
    this.dmChannel.memberIds = [this.selectedDmUser.userId, this.authService.user.userId]
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

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})

export class AddChannelDialogComponent {

  channel: Channel = new Channel()
  snackBarDurationInSeconds = 3;


  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private authService: AuthService, public channelService: ChannelService, private _snackBar: MatSnackBar) { }


  addChannel() {
    this.channel.createdFromUserId = this.authService.user.userId
    this.firestore
    .collection('channels')
    .add(this.channel.toJSON())  // Es können keine Objekte auf Firebase hochgeladen werden. Deshalb .toJSON()
    this.closeDialog();
    this.openSnackBar();
  }


  openSnackBar() {
    let message = 'Channel ' + `"${this.channel.channelName}"` + ' was added!'
    let action = 'Ok'

    this._snackBar.open(message, action, {
      duration: this.snackBarDurationInSeconds * 1000
    });
  }



  closeDialog() {
    this.dialog.closeAll();
  }

}

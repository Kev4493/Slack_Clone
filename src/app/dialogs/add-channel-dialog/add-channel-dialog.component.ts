import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent {

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private authService: AuthService) { }

  channel: Channel = new Channel()

  addChannel() {
    this.channel.createdFromUserId = this.authService.user.userId
    this.firestore
    .collection('channels')
    .add(this.channel.toJSON())  // Es können keine Objekte auf Firebase hochgeladen werden. Deshalb .toJSON()
    .then((result:any) => {
      console.log('adding channel finished', result);
    })
    this.dialog.closeAll();
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}

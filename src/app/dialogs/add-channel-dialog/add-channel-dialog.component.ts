import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent {

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  channel:Channel = new Channel()

  addChannel() {
    console.log('Current Channel is:', this.channel);

    this.firestore
    .collection('channels')
    .add(this.channel.toJSON())  // Es können keine Objekte auf Firebase hochgeladen werden. Deshalb .toJSON()
    .then((result:any) => {
      console.log('adding channel finished', result);
    })
    this.dialog.closeAll();
  }

}

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelDialogComponent } from 'src/app/dialogs/add-channel-dialog/add-channel-dialog.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

  allChannels = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
    .collection('channels')
    .valueChanges({idField: 'channelId'})
    .subscribe((changes:any) => {
      // console.log('Received changes from DB:', changes);
      
      
      this.allChannels = changes;
      console.log('allChannels:', this.allChannels);
    })
  } 

  openAddChannelDialog() {
    this.dialog.open(AddChannelDialogComponent)
  }
}

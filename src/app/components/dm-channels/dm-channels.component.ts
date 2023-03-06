import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddDmChannelDialogComponent } from 'src/app/dialogs/add-dm-channel-dialog/add-dm-channel-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dm-channels',
  templateUrl: './dm-channels.component.html',
  styleUrls: ['./dm-channels.component.scss']
})
export class DmChannelsComponent {

  allDmChannels = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private authService: AuthService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.getAllDmChannels()
  }


  getAllDmChannels() {
    this.firestore
    .collection('directMessageChannels', ref => ref.where('memberIds', 'array-contains', this.authService.currentLoggedInUserId ) )
    .valueChanges({idField: 'dmChannelId'})
    .subscribe((changes:any) => {
      this.allDmChannels = changes;
      console.log('allDmChannels: ', this.allDmChannels);
    })
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }


}

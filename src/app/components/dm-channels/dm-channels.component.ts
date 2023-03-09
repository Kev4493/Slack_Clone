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

  dmChannels = [];
  dmUserIds = [];
  dmUsers = [];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private authService: AuthService, private afAuth: AngularFireAuth) { }


  ngOnInit() {
    this.getAllDmChannels();
  }


  getAllDmChannels() {
    this.firestore
      .collection('directMessageChannels', ref => ref.where('memberIds', 'array-contains', this.authService.currentLoggedInUserId))
      .valueChanges({idField: 'dmChannelId'})
      // .valueChanges()
      .subscribe((changes: any) => {
        this.dmChannels = changes;
        console.log('allDmChannels: ', this.dmChannels);

        this.filterDmChannels()
      })
  }


  filterDmChannels() {
    this.dmUserIds = this.dmChannels
      .map(dmChannel => dmChannel.memberIds)
      .flat()
      .filter(memberId => memberId !== this.authService.currentLoggedInUserId);

    console.log(this.dmUserIds);

    this.getDmUsersById();
  }


  getDmUsersById() {
    this.firestore
      .collection('users', ref => ref.where('userId', 'in', this.dmUserIds))
      .valueChanges()
      .subscribe((changes: any) => {
        this.dmUsers = changes;
        console.log('DM User: ',this.dmUsers)
      })
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }


}

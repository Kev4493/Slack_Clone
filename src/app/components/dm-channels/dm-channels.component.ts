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


  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public authService: AuthService, private afAuth: AngularFireAuth) { }


  ngOnInit() {
    this.getAllDmChannels();
  }


  // Alle dmChannels aus dem Firestore holen, indem sich die eingeloggte ID befindet.
  getAllDmChannels() {
    this.firestore
      .collection('directMessageChannels', ref => ref.where('memberIds', 'array-contains', this.authService.currentLoggedInUserId))
      .valueChanges({ idField: 'dmChannelId' })
      .subscribe((changes: any) => {
        this.dmChannels = changes;
        // console.log('allDmChannels: ', this.dmChannels);

        this.filterDmChannels()
      })
  }


  // Member IDs herausfilter ohne die ID des eingeloggte Nutzers:
  filterDmChannels() {
    this.dmUserIds = this.dmChannels
      .map(dmChannel => dmChannel.memberIds)
      .flat()
      .filter(memberId => memberId !== this.authService.currentLoggedInUserId);

    // console.log('dmUserIds: ', this.dmUserIds);

    this.getDmUsersById();
  }


  // User anhand der Member Ids herausfiltern:
  getDmUsersById() {
    if (this.dmUserIds.length > 0) {
      this.firestore
        .collection('users', ref => ref.where('userId', 'in', this.dmUserIds))
        .valueChanges()
        .subscribe((changes: any) => {
          this.dmUsers = changes;
          // console.log('dmUsers: ', this.dmUsers)

          this.filterDmChannelsForUsers();
        })
    }

  }


  // dmChannels aus DB dem dmUsers Array hinzufügen:
  filterDmChannelsForUsers() {
    this.dmUsers.forEach(user => {
      user.dmChannels = this.dmChannels.filter(channel => channel.memberIds.includes(user.userId));

      // console.log('dmUsers: ', this.dmUsers)
    });
  }


  openAddDmChannelDialog() {
    this.dialog.open(AddDmChannelDialogComponent)
  }


  getUserActivityStatus(userId: string) {
    const user = this.authService.allUsersFromDb.find(u => u.userId === userId);
    return user ? user.userActivityStatus : '';
  }


}

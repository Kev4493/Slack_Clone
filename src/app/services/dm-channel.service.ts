import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DMmessage } from 'src/models/dm-message.class';
import { AuthService } from './auth.service';
import { ChannelService } from './channel.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class DmChannelService {

  dmChannelId: string;
  channelMemberIds: any;
  chatPartnerId: string;
  chatPartnerProfile: any;

  dmChannels = [];
  dmUserIds = [];
  dmUsers = [];


  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, public channelService: ChannelService, public messageService: MessageService, private firestore: AngularFirestore, public authService: AuthService) { }


  getChannelMemberIds() {
    this.firestore
      .collection('directMessageChannels')
      .doc(this.dmChannelId)
      .valueChanges()
      .subscribe(members => {
        this.channelMemberIds = members;
        // console.log('Channel Members', this.channelMemberIds)
        this.getChatPartnerId()
      })
  }


  getChatPartnerId() {
    this.chatPartnerId = this.channelMemberIds?.memberIds
      .find(memberId => memberId !== this.authService.currentLoggedInUserId)
    // console.log('ChatpartnerId = ', this.chatPartnerId);
    this.getChatPartnerProfile();
  }


  getChatPartnerProfile() {
    this.firestore
      .collection('users')
      .doc(this.chatPartnerId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.chatPartnerProfile = changes;
        // console.log('Chatpartner Profile =', this.chatPartnerProfile);
      })
  }


  deleteDmChannelFromDb() {
    this.deleteAllMessagesFromChannel()

    this.firestore
      .collection('directMessageChannels')
      .doc(this.dmChannelId)
      .delete()
    // console.log('DM Channels: ', this.dmChannels)
    this.closeDeleteDmChannelDialog();
    this.router.navigate(['/home'])
  }


  closeDeleteDmChannelDialog() {
    this.dialog.closeAll();
  }


  deleteAllMessagesFromChannel() {
    this.firestore
      .collection('directMessages', ref => ref.where('messageFromChannelId', '==', this.dmChannelId))
      .get()
      .subscribe(async messages => {
        messages.forEach(message => {
          this.firestore
            .collection('directMessages')
            .doc(message.id)
            .delete();
        });
      });
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


  // Member IDs herausfiltern ohne die ID des eingeloggte Nutzers:
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
        .collection('users', ref => ref.where('userId', 'in', this.dmUserIds)) // Hier wird das Problem liegen
        .valueChanges()
        .subscribe((changes: any) => {
          if (this.dmUserIds.length > 0) {
            this.dmUsers = changes;
            // console.log('dmUsers: ', this.dmUsers)
            this.filterDmChannelsForUsers();
          }
        })
    } else {
      this.dmUsers = [];
    }
  }


  // dmChannels aus DB dem dmUsers Array hinzufügen:
  filterDmChannelsForUsers() {
    this.dmUsers.forEach(user => {
      user.dmChannels = this.dmChannels.filter(channel => channel.memberIds.includes(user.userId));
      // console.log('dmUsers: ', this.dmUsers)
    });
  }
}







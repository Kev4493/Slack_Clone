import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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


  constructor(public dialog: MatDialog, private router: Router, public channelService: ChannelService, public messageService: MessageService, private firestore: AngularFirestore, public authService: AuthService) { }


  getChannelMemberIds() {
    this.firestore
      .collection('directMessageChannels')
      .doc(this.dmChannelId)
      .valueChanges()
      .subscribe(members => {
        this.channelMemberIds = members;
        this.getChatPartnerId()
      })
  }


  getChatPartnerId() {
    this.chatPartnerId = this.channelMemberIds?.memberIds
      .find(memberId => memberId !== this.authService.currentLoggedInUserId)
    this.getChatPartnerProfile();
  }


  getChatPartnerProfile() {
    this.firestore
      .collection('users')
      .doc(this.chatPartnerId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.chatPartnerProfile = changes;
      })
  }


  deleteDmChannelFromDb() {
    this.deleteAllMessagesFromChannel()

    this.firestore
      .collection('directMessageChannels')
      .doc(this.dmChannelId)
      .delete()
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
}
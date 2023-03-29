import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DMmessage } from 'src/models/dm-message.class';
import { DeleteNoticeDialogComponent } from '../dialogs/delete-notice-dialog/delete-notice-dialog.component';
import { AuthService } from './auth.service';
import { DmChannelService } from './dm-channel.service';

@Injectable({
  providedIn: 'root'
})
export class DmMessagesService {

  dmMessage = new DMmessage;
  channelMessages: any;
  messageId: any;
  messageFromUserId: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public authService: AuthService, public dmChannelService: DmChannelService) { }


  sendDmMessage() {
    if (this.dmMessage.messageText) {
      this.generateDmMessageObject();
      this.firestore
        .collection('directMessages')
        .add(this.dmMessage.toJSON())
      this.dmMessage.messageText = '';
    }
  }


  generateDmMessageObject() {
    this.dmMessage.author = this.authService.user.userName;
    this.dmMessage.authorColor = this.authService.user.userColor;
    this.dmMessage.createdAt = new Date().getTime();
    this.dmMessage.messageFromChannelId = this.dmChannelService.dmChannelId;
    this.dmMessage.messageFromUserId = this.authService.user.userId
  }


  getAllMessages() {
    this.firestore
      .collection('directMessages', ref => ref.where('messageFromChannelId', '==', this.dmChannelService.dmChannelId).orderBy('createdAt', 'asc'))
      .valueChanges({ idField: "messageId" })
      .subscribe((messages: any) => {
        this.channelMessages = messages
      })
  }


  deleteDmMessageFromDb() {
    if (this.messageFromUserId === this.authService.user.userId) {
      this.firestore
        .collection('directMessages')
        .doc(this.messageId)
        .delete()
      this.closeDeleteDmMessageDialog()
    } else {
      this.dialog.closeAll();
      this.dialog.open(DeleteNoticeDialogComponent)
    }
  }


  closeDeleteDmMessageDialog() {
    this.messageId = '';
    this.messageFromUserId = '';
    this.dialog.closeAll();
  }
}

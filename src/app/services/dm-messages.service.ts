import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DMmessage } from 'src/models/dm-message.class';
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
    this.generateDmMessageObject();
    console.log('directmessage :', this.dmMessage)

    this.firestore
      .collection('directMessages')
      .add(this.dmMessage.toJSON())

    this.dmMessage.messageText = '';
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

        console.log('channelMessages: ', this.channelMessages)
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
      window.alert('Du kannst nur deine eigenen Nachrichten löschen!')
    }
  }


  closeDeleteDmMessageDialog() {
    this.messageId = '';
    this.messageFromUserId = '';
    this.dialog.closeAll();
  }
}

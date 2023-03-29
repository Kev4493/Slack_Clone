import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/models/message.class';
import { DeleteNoticeDialogComponent } from '../dialogs/delete-notice-dialog/delete-notice-dialog.component';
import { ChannelService } from './channel.service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  message: Message = new Message;
  messageId: any
  messageFromUserId: any
  messagesFromDb: any;

  constructor(private firestore: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public channelService: ChannelService) { }


  sendMessage() {
    if (this.message.messageText) {
      this.message.author = this.authService.user.userName
      this.message.authorColor = this.authService.user.userColor
      this.message.createdAt = new Date().getTime();
      this.message.messageFromChannelId = this.channelService.channelId;
      this.message.messageFromUserId = this.authService.user.userId
      this.sendMessageToDb();
      this.message.messageText = '';
    }
  }


  sendMessageToDb() {
    this.firestore
      .collection('messages')
      .add(this.message.toJSON())
  }


  getMessagesFromDb() {
    this.firestore
      .collection('messages', ref => ref.where('messageFromChannelId', '==', this.channelService.channelId).orderBy('createdAt', 'asc'))
      .valueChanges({ idField: "messageId" })
      .subscribe(messages => {
        this.messagesFromDb = messages;
      })
  };


  deleteMessageFromDb() {
    if (this.messageFromUserId === this.authService.user.userId) {
      this.firestore
        .collection('messages')
        .doc(this.messageId)
        .delete();
      this.closeDeleteMessageDialog();
    } else {
      this.dialog.closeAll();
      this.dialog.open(DeleteNoticeDialogComponent);
    }
  }


  closeDeleteMessageDialog() {
    this.messageId = '';
    this.messageFromUserId = '';
    this.dialog.closeAll();
  }
}

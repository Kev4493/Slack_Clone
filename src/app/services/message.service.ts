import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/models/message.class';
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
    this.message.author = this.authService.user.userName
    this.message.authorColor = this.authService.user.userColor
    this.message.createdAt = new Date().getTime();
    this.message.messageFromChannelId = this.channelService.channelId;
    this.message.messageFromUserId = this.authService.user.userId

    // console.log('Current Message is:', this.message);
    this.sendMessageToDb();
    this.message.messageText = '';
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
        console.log('Messages from DB:', this.messagesFromDb);
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
      window.alert('Du kannst nur deine eigenen Nachrichten löschen!')
    }
  }


  closeDeleteMessageDialog() {
    this.messageId = '';
    this.messageFromUserId = '';
    this.dialog.closeAll();
  }
}

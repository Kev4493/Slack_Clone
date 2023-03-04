import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteChannelDialogComponent } from 'src/app/dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { DeleteMessageDialogComponent } from 'src/app/dialogs/delete-message-dialog/delete-message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';
import { DMmessage } from 'src/models/dm-message.class';

@Component({
  selector: 'app-dm-chatroom',
  templateUrl: './dm-chatroom.component.html',
  styleUrls: ['./dm-chatroom.component.scss']
})
export class DMChatroomComponent {

  dmChannelId: string

  messageToUser: any  // MessageTo
  messageFromUser: any     // MessageFrom
  messageText: string;

  dmMessage = new DMmessage;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public messageService: MessageService, public channelService: ChannelService) { }


  ngOnInit(): void {
    this.getIdFromUrl();
  }


  getIdFromUrl() {
    this.route.paramMap.subscribe(paramMap => {
      this.dmChannelId = paramMap.get('id');

      this.getMessageToUser();
    })
  }


  getMessageToUser() {
    this.firestore
    .collection('users')
    .doc(this.dmChannelId)
    .valueChanges()
    .subscribe((user => {
      this.messageToUser = user;
      console.log('DM Recipient: ', this.messageToUser);

      this.getSender();
    }))
  }


  getSender() {
    this.messageFromUser = this.authService.user
    console.log('DM Sender: ', this.messageFromUser);
  }


  sendDmMessage() {
    this.dmMessage.messageFrom = this.messageFromUser.userName;
    this.dmMessage.messageFromId = this.messageFromUser.userId
    this.dmMessage.messageTo = this.messageToUser.userName;
    this.dmMessage.messageToId = this.messageToUser.userId;

    console.log('DM-Message Object: ', this.dmMessage);
    
  }










  openDeleteMessageDialog(messageId: any, messageFromUserId: any) {
    this.messageService.messageId = messageId;
    this.messageService.messageFromUserId = messageFromUserId;
    this.dialog.open(DeleteMessageDialogComponent)
  }


  openDeleteChannelDialog() {
    this.dialog.open(DeleteChannelDialogComponent);
  }


  getUserActivityStatus(messageFromUserId: string) {
    const user = this.authService.allUsersFromDb.find(u => u.userId === messageFromUserId);
    return user ? user.userActivityStatus : '';
  }

}

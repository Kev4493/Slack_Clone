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

  dmMessage = new DMmessage;

  dmChannelId: string;

  messageToUserObject: any;
  messageFromuserObject: any;

  directMessagesFromDb: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public messageService: MessageService, public channelService: ChannelService) { }


  ngOnInit(): void {
    this.getIdFromUrl();
  }


  getIdFromUrl() {
    this.route.paramMap.subscribe(paramMap => {
      this.dmChannelId = paramMap.get('id');

      this.getMessageToUserObject();
    })
  }


  getMessageToUserObject() {
    this.firestore
      .collection('users')
      .doc(this.dmChannelId)
      .valueChanges()
      .subscribe((user => {
        this.messageToUserObject = user;
        console.log('MessageToUserObject = ', this.messageToUserObject);
        
        this.getMessageFromUserObject();
        this.getDmFromDb();
      }))
  }


  getMessageFromUserObject() {
    this.messageFromuserObject = this.authService.user
    console.log('MessageFromUserObject =', this.messageFromuserObject);
  }


  sendDmMessage() {
    this.dmMessage.messageFrom = this.messageFromuserObject.userName;
    this.dmMessage.messageFromId = this.messageFromuserObject.userId;
    this.dmMessage.messageTo = this.messageToUserObject.userName;
    this.dmMessage.messageToId = this.messageToUserObject.userId;

    this.dmMessage.members = [this.messageFromuserObject.userId, this.messageToUserObject.userId]
    console.log('DM-Message-Object = ', this.dmMessage);

    this.sendDmToDb();
  }


  sendDmToDb() {
    this.firestore
      .collection('directmessages')
      .add(this.dmMessage.toJSON())
  }


  getDmFromDb() {
    this.firestore
      .collection('directmessages', ref => ref.where('members', 'array-contains', this.authService.user.userId && this.dmChannelId))
      .valueChanges()
      .subscribe(directmessages => {
        this.directMessagesFromDb = directmessages;
        console.log('directmessages = ', this.directMessagesFromDb);
      })
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

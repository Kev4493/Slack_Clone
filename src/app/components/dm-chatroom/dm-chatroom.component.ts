import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuerySnapshot } from 'firebase/firestore';
import { DeleteChannelDialogComponent } from 'src/app/dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { DeleteDmChannelDialogComponent } from 'src/app/dialogs/delete-dm-channel-dialog/delete-dm-channel-dialog.component';
import { DeleteDmMessageDialogComponent } from 'src/app/dialogs/delete-dm-message-dialog/delete-dm-message-dialog.component';
import { DeleteMessageDialogComponent } from 'src/app/dialogs/delete-message-dialog/delete-message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { DmChannelService } from 'src/app/services/dm-channel.service';
import { DmMessagesService } from 'src/app/services/dm-messages.service';
import { MessageService } from 'src/app/services/message.service';
import { DMmessage } from 'src/models/dm-message.class';

@Component({
  selector: 'app-dm-chatroom',
  templateUrl: './dm-chatroom.component.html',
  styleUrls: ['./dm-chatroom.component.scss']
})

export class DMChatroomComponent {


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public messageService: MessageService, public channelService: ChannelService, public dmChannelService: DmChannelService, public dmMessagesService: DmMessagesService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.dmChannelService.dmChannelId = paramMap.get('id');
      this.dmChannelService.getChannelMemberIds();
      this.dmMessagesService.getAllMessages();
    })
  }


  openDeleteDmMessageDialog(messageId: any, messageFromUserId: any) {
    this.dmMessagesService.messageId = messageId;
    this.dmMessagesService.messageFromUserId = messageFromUserId;
    this.dialog.open(DeleteDmMessageDialogComponent)
  }


  openDeleteDmChannelDialog() {
    this.dialog.open(DeleteDmChannelDialogComponent);
  }


  getUserActivityStatus(messageFromUserId: string) {
    if (messageFromUserId) {
      const user = this.authService.allUsersFromDb.find(u => u.userId === messageFromUserId);
      return user ? user.userActivityStatus : '';
    }
  }
}
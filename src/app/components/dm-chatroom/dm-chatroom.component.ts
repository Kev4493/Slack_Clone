import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuerySnapshot } from 'firebase/firestore';
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


  dmChannelId: string;
  channelMemberIds: any;
  chatPartnerId: string;
  chatPartnerProfile: any;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public messageService: MessageService, public channelService: ChannelService) { }


  ngOnInit(): void {
    this.getIdFromUrl();
  }


  getIdFromUrl() {
    this.route.paramMap.subscribe(paramMap => {
      this.dmChannelId = paramMap.get('id');
      // console.log('dmChannelId =', this.dmChannelId);

      this.getChannelMemberIds();
    })
  }


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
    this.chatPartnerId = this.channelMemberIds.memberIds
      .filter(memberId => memberId !== this.authService.currentLoggedInUserId)
    console.log('ChatpartnerId = ', this.chatPartnerId);

    this.getChatPartnerProfile();
  }


  getChatPartnerProfile() {
    this.firestore
    .collection('users', ref => ref.where('userId', 'in', this.chatPartnerId))
    .valueChanges()
    .subscribe((changes: any) => {
      this.chatPartnerProfile = changes;
      console.log('Chatpartner Profile =', this.chatPartnerProfile)
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

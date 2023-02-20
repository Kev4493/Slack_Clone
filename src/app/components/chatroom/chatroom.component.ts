import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeleteChannelDialogComponent } from 'src/app/dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { DeleteMessageDialogComponent } from 'src/app/dialogs/delete-message-dialog/delete-message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelService } from 'src/app/services/channel.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})

export class ChatroomComponent {


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public messageService: MessageService, public channelService: ChannelService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelService.channelId = paramMap.get('id');     // ID aus der aktuellen URL holen und in Variable channelId speichern:
      this.channelService.getCurrentChannelInfos();           // Channelinfos aus der jeweiligen ID holen:
      this.messageService.getMessagesFromDb();                // Lädt alle Messages von DB in die Var. this.messagesFromDb:
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


  // getStatusClass() {
  //   if (this.authService.user.userActivityStatus == 'online') {
  //     return 'online';
  //   } else if (this.authService.user.userActivityStatus == 'offline') {
  //     return 'offline';
  //   } else if (this.authService.user.userActivityStatus == 'away') {
  //     return 'away';
  //   } else {
  //     return 'no-status';
  //   }
  // }
}
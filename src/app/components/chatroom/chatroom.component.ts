import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  channelId = ''
  messageId = '';

  channel: Channel = new Channel;
  message: Message = new Message;
  messagesFromDb: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private afAuth: AngularFireAuth, private authService: AuthService, public dialog: MatDialog) { }


  ngOnInit(): void {
    // ID aus der aktuellen URL holen und in Variable channelId speichern:
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      console.log('Current Channel ID:', this.channelId);

      // Channelinfos aus der jeweiligen ID holen:
      this.getCurrentChannelInfos();

      // Löst die Funktion im authService aus.
      this.authService.getDisplayNameFromDb();

      // Lädt alle Messages von DB in die Var. this.messagesFromDb
      this.getMessagesFromDb()
    })
  }


  getCurrentChannelInfos() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
        // console.log('Retrieved current channel:', this.channel);
      })
  }


  sendMessage() {
    // Könnte evtl auch direkt ins message Objekt?
    this.message.author = this.authService.loggedInUserName
    this.message.createdAt = new Date().getTime();
    this.message.messageFromChannelId = this.channelId;

    console.log('Current Message is:', this.message);
    this.sendMessageToDb();
    this.message.messageText = '';
  }


  sendMessageToDb() {
    this.firestore
      .collection('messages')
      .add(this.message.toJSON())

    // .then((docRef) => {
    //   console.log('Message ID: ', docRef.id);
    //   this.message.messageFromChannelId = docRef.id;
    // });
  }


  // getMessagesFromDb() {
  //   this.firestore
  //     .collection('messages')
  //     .ref.where('messageFromChannelId', '==', this.channelId)
  //     .orderBy('createdAt', 'asc')
  //     .onSnapshot(snapshot => {
  //       this.messagesFromDb = snapshot.docs.map(doc => doc.data());
  //       console.log('Messages from DB:', this.messagesFromDb);
  //     });
  // }
  

  getMessagesFromDb() {
    this.firestore
      .collection('messages', ref => ref.where('messageFromChannelId', '==', this.channelId).orderBy('createdAt', 'asc'))
      .valueChanges({ idField: "messageId" })
      .subscribe(messages => {
        this.messagesFromDb = messages;
        console.log('Messages from DB:', this.messagesFromDb);
      })
  };


  deleteMessageFromDb(messageId: any) {
    this.firestore
    .collection('messages')
    .doc(messageId)
    .delete();
  }


  deleteChannelFromDb() {

  }
}






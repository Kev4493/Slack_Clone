import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  channelId: any;

  channel: Channel = new Channel;
  message: Message = new Message;

  messagesFromDb: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private afAuth: AngularFireAuth, public authService: AuthService, public dialog: MatDialog, private router: Router) { }


  ngOnInit(): void {
    // ID aus der aktuellen URL holen und in Variable channelId speichern:
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');

      // Channelinfos aus der jeweiligen ID holen:
      this.getCurrentChannelInfos();

      // Lädt alle Messages von DB in die Var. this.messagesFromDb
      this.getMessagesFromDb();
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
    this.message.author = this.authService.user.userName
    this.message.authorColor = this.authService.user.userColor
    this.message.createdAt = new Date().getTime();
    this.message.messageFromChannelId = this.channelId;
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
      .collection('messages', ref => ref.where('messageFromChannelId', '==', this.channelId).orderBy('createdAt', 'asc'))
      .valueChanges({ idField: "messageId" })
      .subscribe(messages => {
        this.messagesFromDb = messages;
        // console.log('Messages from DB:', this.messagesFromDb);
      })
  };


  deleteMessageFromDb(messageId: any, messageFromUserId: any) {
    if (messageFromUserId === this.authService.user.userId) {
      this.firestore
        .collection('messages')
        .doc(messageId)
        .delete();
    } else {
      window.alert('Du kannst nur deine eigenen Nachrichten löschen!')
    }
  }


  deleteChannelFromDb() {
    if (this.authService.user.userId === this.channel.createdFromUserId) {
      this.deleteAllMessagesFromChannel();

      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .delete();
      this.router.navigate(['/home'])
    } else {
      window.alert('Du hast diesen Channel nicht erstellt!')
    }
  }


  deleteAllMessagesFromChannel() {
    this.firestore
      .collection('messages', ref => ref.where('messageFromChannelId', '==', this.channelId)) 
      .get()                          // Hier wird eine Abfrage ausgeführt, um alle Nachrichten aus einer bestimmten Sammlung in der Firestore-Datenbank abzurufen. Die Abfrage beschränkt die Ergebnisse auf Nachrichten, die eine bestimmte Bedingung erfüllen - nämlich dass die Eigenschaft "messageFromChannelId" gleich dem Wert von this.channelId ist.
      .subscribe(async messages => {  // Dieser Befehl abonniert das Abfrageergebnis und ruft die anonyme Funktion auf, die als Argumente die abgerufenen Nachrichten enthält.
        messages.forEach(message => { // Hier wird eine Schleife gestartet, die für jede abgerufene Nachricht ausgeführt wird.
          this.firestore              // In dieser Zeile wird die aktuelle Nachricht gelöscht, indem das Dokument mit der ID, die in der aktuellen Iteration der Schleife gespeichert ist, aus der Sammlung "Nachrichten" gelöscht wird.
          .collection('messages')
          .doc(message.id)
          .delete();
        });
      });
  }

  openConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent)
  }
}
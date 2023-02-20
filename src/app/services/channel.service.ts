import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ChannelService {

  channelId: any;
  channel: Channel = new Channel;

  constructor(public authService: AuthService, private firestore: AngularFirestore, private router: Router, public dialog: MatDialog) { }


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


  deleteChannelFromDb() {
    if (this.authService.user.userId === this.channel.createdFromUserId) {
      this.deleteAllMessagesFromChannel();

      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .delete();
      this.closeDeleteChannelDialog();
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


  closeDeleteChannelDialog() {
    this.dialog.closeAll();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { DeleteNoticeDialogComponent } from '../dialogs/delete-notice-dialog/delete-notice-dialog.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ChannelService {

  channelId: any;
  channel: Channel = new Channel;
  snackBarDurationInSeconds = 3;

  constructor(public authService: AuthService, private firestore: AngularFirestore, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }


  getCurrentChannelInfos() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
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
      this.openSnackBar();
      this.router.navigate(['/home'])
    } else {
      this.dialog.closeAll();
      this.dialog.open(DeleteNoticeDialogComponent);
    }
  }


  openSnackBar() {
    let message = 'Channel ' + `"${this.channel.channelName}"` + ' was deleted'
    let action = 'Got it'

    this._snackBar.open(message, action, {
      duration: this.snackBarDurationInSeconds * 1000
    });
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

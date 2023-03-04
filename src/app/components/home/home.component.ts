import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SetStatusComponent } from '../../dialogs/set-status/set-status.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  snackBarDurationInSeconds = 3;

  constructor(public router: Router, private afAuth: AngularFireAuth, public authService: AuthService, private firestore: AngularFirestore, private _snackBar: MatSnackBar, public dialog: MatDialog) { }


  async ngOnInit() {
    // this.authService.getLoggedInUserId();
    this.authService.getLoggedInUserFromDb();
    this.authService.getAllUsersFromDb();
  }


  getStatusClass() {
    if (this.authService.user.userActivityStatus == 'online') {
      return 'online';
    } else if (this.authService.user.userActivityStatus == 'away') {
      return 'away';
    } else if (this.authService.user.userActivityStatus == 'dnd') {
      return 'dnd';
    } else {
      return 'offline';
    }
  }


  updateStatusToOnline() {
    this.firestore
      .collection('users')
      .doc(this.authService.user.userId)
      .update({
        userActivityStatus: "online"
      })
  }


  updateStatusToAway() {
    this.firestore
      .collection('users')
      .doc(this.authService.user.userId)
      .update({
        userActivityStatus: "away"
      })
  }


  updateStatusToDnd() {
    this.firestore
      .collection('users')
      .doc(this.authService.user.userId)
      .update({
        userActivityStatus: "dnd"
      })
  }


  async updateStatusToOffline() {
    this.firestore
      .collection('users')
      .doc(this.authService.user.userId)
      .update({
        userActivityStatus: "offline"
      })
  }


  logout() {
    this.updateStatusToOffline();
    this.afAuth.signOut();
    this.openSnackBar();
  }


  openSnackBar() {
    let message = 'Successfully logged out!'
    let action = 'Got it'

    this._snackBar.open(message, action, {
      duration: this.snackBarDurationInSeconds * 1000
    });
  }


  openSetStatusDialog() {
    this.dialog.open(SetStatusComponent)
  }
  
}
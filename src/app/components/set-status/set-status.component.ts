import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-set-status',
  templateUrl: './set-status.component.html',
  styleUrls: ['./set-status.component.scss']
})
export class SetStatusComponent {

  status = '';

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public authService: AuthService) { }

  closeDialog() {
    this.dialog.closeAll();
  }


  addStatusInfoToInput(status: string) {
    this.status = status
  }

  addStatusInfoToDb() {
    this.firestore
      .collection('users')
      .doc(this.authService.user.userId)
      .update({
        userStatusInfo: this.status
      })
    this.closeDialog();
  }

  deleteStatus() {
    this.status = '';
    this.addStatusInfoToDb();
  }

}
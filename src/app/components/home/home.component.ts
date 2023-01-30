import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loggedInUserName: any;

  ngOnInit() {
    this.getDisplayNameFromDb();
  }

  constructor(public router: Router, private afAuth: AngularFireAuth) { }

  logout() {
    this.afAuth.signOut();
  }

  getDisplayNameFromDb() {
    this.afAuth.user.subscribe((user) => {
      this.loggedInUserName = user.displayName;
    });
  }

}

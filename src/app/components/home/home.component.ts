import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(public router: Router, private afAuth: AngularFireAuth, public authService: AuthService) { }


  async ngOnInit() {
    this.authService.getLoggedInUserId();
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


  logout() {
    this.afAuth.signOut();
  }

}
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  user: User = new User;

  constructor(public router: Router, private afAuth: AngularFireAuth, public authService: AuthService) { }


  ngOnInit() {
    this.authService.getUserInfomrationsFromDb();
    // console.log('getUserInfomrationsFromDb:', this.user);
  }


  logout() {
    this.afAuth.signOut();
  }

}

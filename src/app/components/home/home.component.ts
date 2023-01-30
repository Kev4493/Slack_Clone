import { Component } from '@angular/core';
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


  ngOnInit() {
    this.authService.getDisplayNameFromDb();      // Löst die Funktion im authService aus.
  }


  logout() {
    this.afAuth.signOut();
  }

}

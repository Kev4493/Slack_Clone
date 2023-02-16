import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user
  user: User = new User;

  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

    this.userLoggedIn = false
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }


  async loginUser(email: string, password: string): Promise<any> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Auth Service: loginUser: success');
    } catch (error) {
      console.log('Auth Service: login error...');
      console.log('error code', error.code);
      console.log('error', error);
      if (error.code)
        return { isValid: false, message: error.message };
    }
  }


  async registerUser(user: any): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      let emailLower = user.email.toLowerCase();
      result.user.sendEmailVerification(); // immediately send the user a verification email
    } catch (error) {
      console.log('Auth Service: signup error', error);
      if (error.code)
        return { isValid: false, message: error.message };
    }
  }


  getLoggedInUserInfomrationsFromDb() {
    this.afAuth.user.subscribe((userDb) => {        // Die Funktion verwendet das "afAuth.user" Objekt und abonniert es mit einem Callback.
      if (!userDb) return;                          // Innerhalb des Callbacks wird überprüft, ob ein Benutzer vorhanden ist. Wenn nicht, wird die Funktion beendet! 
      this.user.userName = userDb.displayName;
      this.user.userEmail = userDb.email;
      this.user.userId = userDb.uid;
      console.log('getLoggedInUserInfomrationsFromDb:', this.user);
    });
  }


  getUserInitials(fullname: string) {
    if (fullname) {
      const names = fullname.split(' ');
      let initials = '';

      for (const name of names) {
        if (name[0]) {
          initials += name[0].toUpperCase();
        }
      }
      return initials;
    }
    return '';
  }


  getFirstName(fullname: string) {
    if (fullname) {
      const firstName = fullname.split(' ');

      if (firstName.length >= 1) {
        return firstName[0];
      }
    }
    return '';
  }

}
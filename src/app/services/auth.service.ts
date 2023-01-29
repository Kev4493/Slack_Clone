import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

  constructor(private router: Router, private afAuth: AngularFireAuth) {
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

}

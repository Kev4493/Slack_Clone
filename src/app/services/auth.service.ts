import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  online: Boolean
  offline: Boolean
  away: Boolean

  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user
  user: User = new User;
  allUsersFromDb: any;
  generatedUserColor: string;
  currentLoggedInUserId: string;
  loggedInUserFromDb: any;


  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.userLoggedIn = false
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
        this.currentLoggedInUserId = user.uid
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
      const userLower = user.email.toLowerCase();

      await result.user.updateProfile({
        displayName: user.displayName,
      });

      await this.firestore.collection('users').doc(result.user.uid).set({
        userName: user.displayName,
        userEmail: userLower,
        userId: result.user.uid,
        userColor: this.generatedUserColor,
        userActivityStatus: 'online'
      });

      console.log('Auth Service: registerUser: success');
      this.router.navigate(['/home']);

    } catch (error) {
      console.log('Auth Service: signup error', error);

      if (error.code) {
        return { isValid: false, message: error.message };
      }
    }
  }


  async getLoggedInUserFromDb() {
    const currentUserCollection = this.firestore.collection('users', ref => ref.where('userId', '==', this.currentLoggedInUserId))
    currentUserCollection.valueChanges().subscribe(user => {
      if (user[0]['userId'] == this.currentLoggedInUserId) {
        this.loggedInUserFromDb = user;
        this.generateUserObject();
      }
    })
  }


  generateUserObject() {
    this.user.userColor = this.loggedInUserFromDb[0].userColor;
    this.user.userEmail = this.loggedInUserFromDb[0].userEmail;
    this.user.userId = this.loggedInUserFromDb[0].userId;
    this.user.userName = this.loggedInUserFromDb[0].userName;
    this.user.userActivityStatus = this.loggedInUserFromDb[0].userActivityStatus;
    this.user.userStatusInfo = this.loggedInUserFromDb[0].userStatusInfo;
    this.user.userStatusEmoji = this.loggedInUserFromDb[0].userStatusEmoji;
  }


  getAllUsersFromDb() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe(allUsers => {
        this.allUsersFromDb = allUsers;
      })
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
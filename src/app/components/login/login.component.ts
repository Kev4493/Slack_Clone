import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

  hide = true;
  snackBarDurationInSeconds = 3;
  loginForm: FormGroup
  firebaseErrorMessage;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth,private firestore: AngularFirestore, private _snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });

    this.firebaseErrorMessage = '';
  }


  openSnackBar() {
    let message = 'Successfully logged in!'
    let action = 'Got it'

    this._snackBar.open(message, action, {
      duration: this.snackBarDurationInSeconds * 1000
    });
  }


  get email() {
    return this.loginForm.get('email')
  }

  
  get password() {
    return this.loginForm.get('password')
  }


  loginUser() {
    if (this.loginForm.invalid)
      return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {                                 // null is success, false means there was an error
        console.log('logging in...');
        this.openSnackBar();
        this.router.navigate(['/home']);                // when the user is logged in, navigate them to home
        this.updateStatusToOnline();
      }
      else if (result.isValid == false) {
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }


  updateStatusToOnline() {
    // debugger;
    this.firestore
      .collection('users')
      // .doc(this.authService.user.userId)
      .doc(this.authService.currentLoggedInUserId)
      .update({
        userActivityStatus: "online"
      })
  }

}

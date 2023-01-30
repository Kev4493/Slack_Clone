import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  firebaseErrorMessage: any;

  hide = true;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { 
    this.firebaseErrorMessage = '';
  }

  ngOnInit():void {
    this.registerForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }



  get displayName() {
    return this.registerForm.get('displayName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }



  // register() {
  //   if (this.registerForm.invalid)                                            // Überprüfung, ob das RegisterForm (Formular zur Registrierung) ungültig ist. Falls ja, wird die Funktion beendet und nichts passiert.
  //     return;
    
  //   this.authService.registerUser(this.registerForm.value).then((result) => { // Wenn das RegisterForm gültig ist, wird die Methode "registerUser" des authService-Objekts aufgerufen, welches das übergebene Formular (registerForm.value) als Parameter enthält.
  //     if (result == null)                                                     // Wenn das Ergebnis des Aufrufs "null" ist, wird der Benutzer auf die "home"-Seite weitergeleitet.
  //       this.router.navigate(['/home']);
  //     else if (result.isValid == false)                                       // Wenn das Ergebnis des Aufrufs "isValid" als "false" zurückgibt, wird die Variable "firebaseErrorMessage" auf die Nachricht (result.message) gesetzt, welche das Ergebnis zurückgibt.
  //       this.firebaseErrorMessage = result.message;
  //   }).catch(() => {                                                          // Bei einem Fehler während des Aufrufs der Methode "registerUser" wird die catch-Funktion aufgerufen, die in diesem Beispiel leer ist.

  //   })
  // }

  register() {
    if (this.registerForm.invalid) return;                                      // Wenn Formular ungültig, wird Funktion soffort beendet.
    this.authService.registerUser(this.registerForm.value).then((result) => {   // Aufruf der "registerUser"-Methode des "authService", um den Benutzer zu registrieren. Das Formular wird als Argument übergeben.
      this.afAuth.user.subscribe((user) => {                                    // Wenn die Registrierung erfolgreich ist, abonniert die Funktion den Benutzer.
        user.updateProfile({                                                    // Über die "updateProfile"-Methode des Benutzers wird der "displayName" auf den Wert aus dem Formular gesetzt.
          displayName: this.registerForm.value.displayName
        }).then(() => {
          this.router.navigate(['/home']);                                      // Wenn die Aktualisierung des Profils erfolgreich ist, wird der Benutzer zur Seite "/home" weitergeleitet.
        });
      });
    });
  }
  
}

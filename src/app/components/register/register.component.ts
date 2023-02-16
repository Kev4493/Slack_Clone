import { Component } from '@angular/core';
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

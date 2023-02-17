import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  firebaseErrorMessage: any;


  hide = true;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.firebaseErrorMessage = '';
  }


  ngOnInit(): void {
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
    if (this.registerForm.invalid) return;
    this.generateUserColor();
    this.authService.registerUser(this.registerForm.value)
  }


  // generateUserColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   this.authService.generatedUserColor = color
  // }

  
  generateUserColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    let contrastRatio = 0;

    // Schleife, die Farben generiert, bis eine Farbe mit einem ausreichenden Kontrastverhältnis gefunden wird
    while (contrastRatio < 4.5) {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      const backgroundColor = tinycolor(color);
      contrastRatio = tinycolor.readability(backgroundColor, 'black');
    }

    this.authService.generatedUserColor = color;
  }
}
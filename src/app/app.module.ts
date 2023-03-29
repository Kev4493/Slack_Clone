import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './components/register/register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChannelsComponent } from './components/channels/channels.component';
import { MatTreeModule } from '@angular/material/tree';
import { AddChannelDialogComponent } from './dialogs/add-channel-dialog/add-channel-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatMenuModule } from '@angular/material/menu';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { DeleteMessageDialogComponent } from './dialogs/delete-message-dialog/delete-message-dialog.component';
import { DeleteChannelDialogComponent } from './dialogs/delete-channel-dialog/delete-channel-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SetStatusComponent } from './dialogs/set-status/set-status.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UsersComponent } from './components/users/users.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DMChatroomComponent } from './components/dm-chatroom/dm-chatroom.component';
import { DmChannelsComponent } from './components/dm-channels/dm-channels.component';
import { AddDmChannelDialogComponent } from './dialogs/add-dm-channel-dialog/add-dm-channel-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDmChannelDialogComponent } from './dialogs/delete-dm-channel-dialog/delete-dm-channel-dialog.component';
import { DeleteDmMessageDialogComponent } from './dialogs/delete-dm-message-dialog/delete-dm-message-dialog.component';
import { DeleteNoticeDialogComponent } from './dialogs/delete-notice-dialog/delete-notice-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ChannelsComponent,
    AddChannelDialogComponent,
    ChatroomComponent,
    DeleteMessageDialogComponent,
    DeleteChannelDialogComponent,
    SetStatusComponent,
    UsersComponent,
    DMChatroomComponent,
    DmChannelsComponent,
    AddDmChannelDialogComponent,
    DeleteDmChannelDialogComponent,
    DeleteDmMessageDialogComponent,
    DeleteNoticeDialogComponent,
  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule,
    AngularFireAuthModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTreeModule,
    MatDialogModule,
    AngularFirestoreModule,
    MatMenuModule,
    MatSnackBarModule,
    PickerModule,
    MatTooltipModule,
    MatSelectModule
  ],


  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

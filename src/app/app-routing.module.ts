import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { DMChatroomComponent } from './components/dm-chatroom/dm-chatroom.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'channel-chatroom/:id', component: ChatroomComponent },
      { path: 'dm-chatroom/:id', component: DMChatroomComponent }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

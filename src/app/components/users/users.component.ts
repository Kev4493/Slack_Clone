import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(public authService: AuthService) { }

  
  getUserActivityStatus(userId: string) {
    const user = this.authService.allUsersFromDb.find(u => u.userId === userId);
    return user ? user.userActivityStatus : '';
  }

}

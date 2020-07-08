import {Component} from '@angular/core';
import {UserService} from './auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private user: UserService
  ) {
    if (this.user.getStorage('userData')) {
      this.user.userData = this.user.getStorage('userData');
    }
  }
}

import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public user: UserService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.user.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

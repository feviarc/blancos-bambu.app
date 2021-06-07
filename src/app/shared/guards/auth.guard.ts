import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  isGuardValidated: boolean;


  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    this.isGuardValidated = false;
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      this.isGuardValidated = true;
    }
    else {
      this.router.navigate(['sign-in']);
    }
    return this.isGuardValidated;
  }

}

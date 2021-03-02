import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  isLoggedInAndVerified: boolean;


  constructor(
    public router: Router,
    public authService: AuthService
  ) { 
    this.isLoggedInAndVerified = false;
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn) {
      if(this.authService.userData.emailVerified) {
        this.isLoggedInAndVerified = true;
      }
      else {
        this.router.navigate(['verify-email-address']);
      }
    }
    else {
      this.router.navigate(['sign-in']);
    }

    return this.isLoggedInAndVerified;
  }
  
}

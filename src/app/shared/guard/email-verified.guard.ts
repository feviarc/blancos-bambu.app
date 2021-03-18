import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class EmailVerifiedGuard implements CanActivate {

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
    if(this.authService.userData.emailVerified !== undefined) {
      if(this.authService.userData.emailVerified) {
        this.isGuardValidated = true;
      }
      else {
        this.router.navigate(['verify-email-address']);
      }
    }
    return this.isGuardValidated;
  }
  
}

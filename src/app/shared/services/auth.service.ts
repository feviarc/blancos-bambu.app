import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any;


  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    this.userData = {};
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          router.navigate(['/']);
        }
      }
    );
  }


  private afsSaveUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`/users/${user.uid}`);
    return userRef.set(userData, {merge: true});
  }


  async forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
    return user ? true : false;
  }


  async sendVerificationMail() {
    return this.afAuth.currentUser.then(
      user => {
        return user?.sendEmailVerification();
      }
    );
  }


  async signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      result => {
        this.afsSaveUserData(result.user);
      }
    );
  }


  async signOut() {
    return this.afAuth.signOut().then(
      () => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      }
    );
  }


  async signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      result => {
        this.sendVerificationMail();
        this.afsSaveUserData(result.user);
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { app } from '../../../environments/environment.app';

interface Token {
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  private uid: string;

  constructor(
    private db: AngularFirestore,
    private messaging: AngularFireMessaging,
    private authService: AuthService
  ) {
    this.uid = this.authService.userData.uid;
  }


  requestMessagingPermission() {
    this.messaging.requestToken.subscribe(
      token => {
        if (token) {
          const tokenRef = this.db.collection<Token>(app.db.path.tokens).doc(this.uid);
          tokenRef.set({token});
        }
      }
    );
  }


  listeningNotifications() {
    this.messaging.messages.subscribe(console.log);
  }

}

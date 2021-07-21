import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { app } from '../../../environments/environment.app';

interface Token {
  token: string | null;
}


@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  private tokensRef: AngularFirestoreCollection<Token>;


  constructor(
    private db: AngularFirestore,
    private messaging: AngularFireMessaging
  ) {
    this.tokensRef = this.db.collection<Token>(app.db.path.tokens);
  }


  requestMessagingPermission() {
    this.messaging.requestToken.subscribe(
      token => {
        if (token) {
          console.log(token);
          this.tokensRef.add({token});
        }
      }
    );
  }


  listeningNotifications() {
    this.messaging.messages.subscribe(
      message => {
        console.log('message: ', message);
      }
    );
  }

}

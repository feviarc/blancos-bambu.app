import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 

  cardProfilePicture: string;
  profilePictureURL: string;


  constructor(public authService: AuthService) {
    this.profilePictureURL = 'https://thispersondoesnotexist.com/image';
    this.cardProfilePicture = `url('${this.profilePictureURL}')`;
  }

}

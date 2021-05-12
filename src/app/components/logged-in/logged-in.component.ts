import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})

export class LoggedInComponent implements OnInit {

  profilePicture: string;
  profilePictureURL: string;


  constructor(public authService: AuthService) {
    this.profilePictureURL = 'https://thispersondoesnotexist.com/image';
    this.profilePicture = `url('${this.profilePictureURL}')`;
  }


  ngOnInit(): void { }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  constructor(public authService: AuthService) { }


  ngOnInit(): void { }


  signIn(userEmail: string, userPassword: string) {
    this.authService.signIn(userEmail, userPassword).catch(
      error => {
        window.alert('Algo salió mal!');
      }
    );
  }


  googleAuth() {
    this.authService.googleAuth().catch(
      error => {
        window.alert('Algo salió mal con la autenticación de Google');
      }
    );
  }


  microsoftAuth() {
    this.authService.microsoftAuth().catch(
      error => {
        window.alert('Algom salió mal con la autenticación de Microsoft');
      }
    );
  }

}

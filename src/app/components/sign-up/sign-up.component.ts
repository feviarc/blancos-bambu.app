import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

  alertMessage: string;


  constructor(public authService: AuthService) {
    this.alertMessage = '';
  }


  signUp(userEmail: string, userPassword: string) {
    this.authService.signUp(userEmail, userPassword).catch(
      error => {
        this.alertMessage = error.message;
        setTimeout(()=>{this.alertMessage='';}, 5000);
      }
    );
  }

}

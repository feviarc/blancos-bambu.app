import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  alertMessage: string;
  setAlertMessage: any;


  constructor(public authService: AuthService) { 
    this.alertMessage = '';
    this.setAlertMessage = (error: any) => {
      this.alertMessage = error.message;
      setTimeout(()=>{this.alertMessage='';}, 5000);
    };
  }


  ngOnInit(): void { }


  signIn(userEmail: string, userPassword: string) {
    this.authService.signIn(userEmail, userPassword).catch(this.setAlertMessage);
  }


  googleAuth() {
    this.authService.googleAuth().catch(this.setAlertMessage);
  }


  microsoftAuth() {
    this.authService.microsoftAuth().catch(this.setAlertMessage);
  }

}

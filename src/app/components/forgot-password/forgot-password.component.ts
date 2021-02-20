import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  alertMessage: string;
  emailSent: boolean;
  passwordResetEmail: string;


  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.alertMessage = '';
    this.emailSent = false;
    this.passwordResetEmail='';
  }


  ngOnInit(): void { }


  forgotPassword(passwordResetEmail: string) {
    this.authService.forgotPassword(passwordResetEmail)
    .then(
      () => {
        this.passwordResetEmail = passwordResetEmail;
        this.emailSent = true; 
      }
    )
    .catch(
      error => {
        this.alertMessage=error.message;
        setTimeout(()=>{this.alertMessage='';}, 3000);
      }
    );
  }


  goToLogin() {
    this.router.navigate(['sign-in']);
  }

}

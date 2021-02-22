import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service'; 

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})

export class VerifyEmailComponent implements OnInit {

  alertMessage: string;
  resendButtonDisabled: boolean;


  constructor(public authService: AuthService, public router: Router) { 
    this.alertMessage = '';
    this.resendButtonDisabled = false;
  }


  ngOnInit(): void { }


  goToLogin() {
    this.router.navigate(['sign-in']);
  }


  sendVerificationEmail() {
    this.authService.sendVerificationMail()
    .then(
      () => {
        this.router.navigate(['sign-in']);
      }
    )
    .catch(
      error => {
        this.alertMessage = error.message;
        this.resendButtonDisabled = true;
        setTimeout(()=>{this.alertMessage=''},5000);
      }
    );
  }

}

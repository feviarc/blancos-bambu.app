import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  alertMessage: string;
  setAlertMessage: any;
  isPasswordHidden: boolean;
  pwdInputType: string;
  pwdInputIcon: string;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;


  constructor(public authService: AuthService) { 
    this.isPasswordHidden = true;
    this.pwdInputType = 'password';
    this.pwdInputIcon = 'fas fa-eye';
    this.alertMessage = '';

    this.emailFormControl = new FormControl('',[
      Validators.required,
      Validators.email
    ]);

    this.passwordFormControl = new FormControl('',[
      Validators.required
    ]);

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


  togglePasswordVisibility() {
    this.isPasswordHidden = !(this.isPasswordHidden);
    if(this.isPasswordHidden) {
      this.pwdInputType = 'password';
      this.pwdInputIcon = 'fas fa-eye'
    }
    else {
      this.pwdInputType = 'text';
      this.pwdInputIcon = 'fas fa-eye-slash'
    }
  }

}

import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {

  isLoadingData: boolean;
  isPasswordHidden: boolean;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  openSnackBar: any;


  constructor(
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.isLoadingData = false;
    this.isPasswordHidden = true;

    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);

    this.openSnackBar = (error: any) => {
      this.snackBar.open('🥵' + error.message, 'CERRAR');
    };
  }


  signIn(userEmail: string, userPassword: string) {
    this.isLoadingData = true;
    this.authService.signIn(userEmail, userPassword)
     .catch(this.openSnackBar)
     .finally(
       () => {
         this.isLoadingData = false;
       }
    );
  }


  googleAuth() {
    this.authService.googleAuth().catch(this.openSnackBar);
  }


  microsoftAuth() {
    this.authService.microsoftAuth().catch(this.openSnackBar);
  }

}

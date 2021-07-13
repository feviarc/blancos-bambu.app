import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';


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
    private authService: AuthService,
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
  }


  signIn(userEmail: string, userPassword: string) {
    this.isLoadingData = true;
    this.authService.signIn(userEmail, userPassword)
    .catch(
      error => {
        this.snackBar.open('🥵 Algo salió mal. Revisa tu cuenta de correo y contraseña', 'CERRAR');
      }
    )
    .finally(
      () => {
        this.isLoadingData = false;
      }
    );
  }

}

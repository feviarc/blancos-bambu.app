import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { InstallAppService } from '../../shared/services/install-app.service';


@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})

export class LoggedInComponent {

  profilePicture: string;
  profilePictureURL: string;
  installAppEvent: any;


  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    public installService: InstallAppService
  ) {
    this.profilePictureURL = '../../../assets/img/face.jpg';
    this.profilePicture = `url('${this.profilePictureURL}')`;
  }


  openExitDialog() {
    const dialogRef = this.dialog.open(ExitDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.authService.signOut();
        }
      }
    );
  }

}

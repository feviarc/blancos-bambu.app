import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { InstallAppService } from '../../shared/services/install-app.service';
import { MessagingService } from '../../shared/services/messaging.service';


@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})

export class LoggedInComponent implements OnInit{

  profilePicture: string;
  profilePictureURL: string;
  installAppEvent: any;


  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    public installService: InstallAppService,
    private messaging: MessagingService
  ) {
    this.profilePictureURL = '../../../assets/img/face.jpg';
    this.profilePicture = `url('${this.profilePictureURL}')`;
  }


  ngOnInit() {
    this.messaging.requestMessagingPermission();
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

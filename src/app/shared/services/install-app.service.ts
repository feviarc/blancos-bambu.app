import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class InstallAppService {

  private installingEvent: any;


  constructor() {
    this.installingEvent = null;
  }


  get eventStatus() {
    return this.installingEvent;
  }


  set eventStatus(event: any) {
    this.installingEvent = event;
  }


  showInstallAppDialog() {
    this.installingEvent.prompt();
    this.installingEvent.userChoice.then(
      (chosenButton: any) => {
        if (chosenButton.outcome === 'accepted') {
          this.installingEvent = null;
        }
      }
    );
  }

}

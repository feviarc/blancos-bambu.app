import { Component, HostListener } from '@angular/core';
import { InstallAppService } from './shared/services/install-app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(public installService: InstallAppService) { }


  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.installService.eventStatus = event;
  }

}

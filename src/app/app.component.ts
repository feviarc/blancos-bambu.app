import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { InstallAppService } from './shared/services/install-app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private swUpdate: SwUpdate,
    private installService: InstallAppService
  ) { }


  ngOnInit() {
    if(this.swUpdate.isEnabled) {
      this.updateApp();
    }
  }


  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.installService.eventStatus = event;
  }


  updateApp() {
    this.swUpdate.available.subscribe(
      () => {
        window.location.reload();
      }
    );
  }

}

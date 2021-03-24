import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isLoadingData: boolean;


  constructor(public authService: AuthService) {
    this.isLoadingData = false;
  }


  ngOnInit(): void { }

}

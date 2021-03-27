import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isLoadingData: boolean;
  activeOrders: any;


  constructor(
    public authService: AuthService,
    public crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = false;
    this.activeOrders = crudService.getActiveOrders();
  }


  ngOnInit(): void { }

}

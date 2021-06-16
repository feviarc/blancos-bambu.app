import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  isLoadingData: boolean;
  orders: any;


  constructor(
    private snackBar: MatSnackBar,
    private crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;
    this.crudService.getActiveOrders().subscribe(
      documents => {
        this.orders = documents;
        this.isLoadingData = false;
      },
      error => {
        const snackBarRef = this.snackBar.open(`🔴 Estamos tratando de conectarnos a la base de datos. [ ${error.code} ]`);
        snackBarRef.afterDismissed().subscribe(
          () => {
            window.location.href = '/';
          }
        );
      }
    );
  }

}

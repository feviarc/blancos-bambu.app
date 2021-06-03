import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddResellerSheetComponent } from './add-reseller-sheet/add-reseller-sheet.component';
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
    private bottomSheet: MatBottomSheet,
    private crudService: FirebaseCRUDService,
    private snackBar: MatSnackBar
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


  openAddResellerSheet() {
    this.bottomSheet.open(AddResellerSheetComponent);
  }

}

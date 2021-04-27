import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddResellerSheetComponent } from './add-reseller-sheet/add-reseller-sheet.component';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isLoadingData: boolean;
  orders: any;


  constructor(
    private bottomSheet: MatBottomSheet,
    private crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;
    this.crudService.getActiveOrders().subscribe(
      documents => {
        this.orders = documents;
        this.isLoadingData = false;
      },
      error => {
        window.alert(error.message);
      }
    );
  }


  ngOnInit(): void { }


  openAddResellerSheet() {
    this.bottomSheet.open(AddResellerSheetComponent);
  }

}

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
  activeOrders: any;


  constructor(
    private bottomSheet: MatBottomSheet,
    public crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = false;
    this.activeOrders = crudService.getActiveOrders();
  }


  ngOnInit(): void { }


  openAddResellerSheet() {
    this.bottomSheet.open(AddResellerSheetComponent);
  }

}

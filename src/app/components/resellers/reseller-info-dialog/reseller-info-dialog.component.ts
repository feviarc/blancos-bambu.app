import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseCRUDService } from 'src/app/shared/services/firebase-crud.service';


@Component({
  selector: 'app-reseller-info-dialog',
  templateUrl: './reseller-info-dialog.component.html',
  styleUrls: ['./reseller-info-dialog.component.scss']
})

export class ResellerInfoDialogComponent {

  activeOrdersDataSource: any;
  deliveredOrdersDataSource: any;
  activeOrdersDisplayedColumns: string[] = ['amount', 'name', 'registerDate'];
  deliveredOrdersDisplayedColumns: string[] = ['amount', 'name', 'registerDate', 'deliveryDate'];


  constructor(
    @Inject(MAT_DIALOG_DATA) public reseller: any,
    public crudService: FirebaseCRUDService
  ) {
    this.activeOrdersDataSource = [];
    this.deliveredOrdersDataSource = [];
    crudService.getActiveOrdersByReseller(reseller.id).subscribe(
      documents => {
        this.activeOrdersDataSource = documents.map(
          order => this.changeOrderFormat(order)
        );
      }
    );
    crudService.getDeliveredOrdersByReseller(reseller.id).subscribe(
      documents => {
        this.deliveredOrdersDataSource = documents.map(
          order => this.changeOrderFormat(order)
        );
      }
    );
  }


  private changeOrderFormat(order: any) {
    return ({
        amount: order.amount,
        name: order.product.name,
        registerDate: order.status.registerDate,
        deliveryDate: order.status.deliveryDate || null
    });
  }

}

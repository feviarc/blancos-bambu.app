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
  displayedColumns: string[] = ['amount', 'name', 'date'];


  constructor(
    @Inject(MAT_DIALOG_DATA) public reseller: any,
    public crudService: FirebaseCRUDService
  ) {
    crudService.getDeliveredOrdersByReseller(reseller.id).subscribe(
      documents => {
        this.deliveredOrdersDataSource = documents.map(
          order => this.changeOrderFormat(order, 'DELIVERY_DATE')
        );
      }
    );
    crudService.getActiveOrdersByReseller(reseller.id).subscribe(
      documents => {
        this.activeOrdersDataSource = documents.map(
          order => this.changeOrderFormat(order, 'REGISTER_DATE')
        );
      }
    );
  }


  private changeOrderFormat(order: any, statusDate: string) {
    let formatedOrder =
      {
        amount: order.amount,
        name: order.product.name,
        date: null
      };

    if(statusDate === 'DELIVERY_DATE') {
      formatedOrder.date = order.status.deliveryDate;
    } else {
      formatedOrder.date = order.status.registerDate;
    }

    return formatedOrder;
  }

}

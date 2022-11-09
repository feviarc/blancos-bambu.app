import { Component } from '@angular/core';
import { FirebaseCRUDService } from '../../../shared/services/firebase-crud.service';

export interface DeliveredOrder {
  amount: number;
  name: string;
  reseller: string;
  deliveryDate: string;
}

@Component({
  selector: 'app-delivered-orders-list',
  templateUrl: './delivered-orders-list.component.html',
  styleUrls: ['./delivered-orders-list.component.scss']
})


export class DeliveredOrdersListComponent {

  dataSource: any;
  displayedColumns: string[] = ['amount', 'name', 'reseller', 'deliveryDate'];


  constructor(private crudService: FirebaseCRUDService) {
    this.crudService.getDeliveredOrders().subscribe(
      documents => {
        this.dataSource = documents.map(
          order => this.changeDeliveredOrderFormat(order)
        );
      }
    );
  }


  private changeDeliveredOrderFormat(order: any) {
    return (
      {
        amount: order.amount,
        name: order.product.name,
        reseller: order.reseller.displayName,
        deliveryDate: order.status.deliveryDate
      }
    )
  }

}

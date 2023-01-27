import { Component } from '@angular/core';
import { FirebaseCRUDService } from '../../../shared/services/firebase-crud.service';

export interface DeliveredOrder {
  amount: number;
  name: string;
  reseller: string;
  registerDate: string;
  deliveryDate: string;
}

@Component({
  selector: 'app-delivered-orders-list',
  templateUrl: './delivered-orders-list.component.html',
  styleUrls: ['./delivered-orders-list.component.scss']
})


export class DeliveredOrdersListComponent {

  dataSource: any;
  displayedColumns: string[] = ['amount', 'name', 'reseller', 'registerDate', 'deliveryDate'];


  constructor(private crudService: FirebaseCRUDService) {
    this.crudService.getDeliveredOrders().subscribe(
      documents => {
        this.dataSource = documents.map(
          order => this.changeDeliveredOrderFormat(order)
        );
      }
    );
  }


  private changeDeliveredOrderFormat(order: any): DeliveredOrder {
    return (
      {
        amount: order.amount,
        name: order.product.name,
        reseller: order.reseller.displayName,
        registerDate: order.status.registerDate,
        deliveryDate: order.status.deliveryDate
      }
    )
  }

}

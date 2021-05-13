import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[];
  isLoadingData: boolean;
  @ViewChild(MatSort) sort: any;


  constructor(private crudService: FirebaseCRUDService) {
    this.displayedColumns = [
      'registerDate',
      'resellerDisplayName',
      'productName',
      'productBrand',
      'amount',
      'isInStore',
      'icons'
    ];
    this.isLoadingData = true;
    this.crudService.getActiveOrders().subscribe(
      documents => {
        const orders = documents.map(
          (order) => {
            return {
              orderID: order.id,
              resellerID: order.reseller.id,
              resellerDisplayName: order.reseller.displayName,
              productID: order.product.id,
              productBrandCode: order.product.brandCode,
              productName: order.product.name,
              productBrand: order.product.brand,
              isDelivered: order.status.isDelivered,
              registerDate: order.status.registerDate,
              deliveryDate: order.status.deliveryDate,
              amount: order.amount,
              isInStore: order.isInStore,
              comments: order.coments
            };
          }
        );
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  ngOnInit(): void { }

}

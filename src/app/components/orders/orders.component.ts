import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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


  constructor(
    private snackBar: MatSnackBar,
    private crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;

    const ordersMapping = (order:any) => {
      const isInStoreFormControl = new FormControl('',[
        Validators.min(0),
        Validators.max(order.amount)
      ]);
      isInStoreFormControl.setValue(order.isInStore);
      return {
        id: order.id,
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
        comments: order.comments,
        isInStoreFormControl: isInStoreFormControl
      };
    }

    this.displayedColumns = [
      'registerDate',
      'resellerDisplayName',
      'productName',
      'productBrand',
      'amount',
      'isInStore',
      'icons'
    ];

    this.crudService.getActiveOrders().subscribe(
      documents => {
        const orders = documents.map(ordersMapping);
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  ngOnInit(): void { }


  updateIsInStoreProperty(order: any, isInStore: string) {
    this.crudService.orderUpdate(order.id, order.resellerID, {isInStore: +isInStore})
    .then(
      () => {
        this.snackBar.open(
          `🟢 Se actualizó ${order.productName}`,
          'CERRAR'
        );
      }
    )
    .catch(
      error => {
        this.snackBar.open(
          `🔴 No fue posible actualizar ${order.productName}`,
          'CERRAR'
        );
      }
    );
  }

}

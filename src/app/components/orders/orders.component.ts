import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class OrdersComponent implements OnInit {

  dataSource: any;
  tableColumns: string[];
  expandedElement: any;
  isLoadingData: boolean;
  @ViewChild(MatSort) sort: any;


  constructor(
    private snackBar: MatSnackBar,
    private crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;

    this.tableColumns = [
      'unfoldIcon',
      'registerDate',
      'resellerDisplayName',
      'productName',
      'productBrand',
      'amount',
      'isInStore',
      'deliveryButton'
    ];

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


  updateIsInStoreProperty(order: any, isInStore: number) {
    this.crudService.orderUpdate(order, {isInStore: isInStore})
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

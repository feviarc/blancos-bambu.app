import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';
import { OrderDeliveryDialogComponent } from './delivery-order-dialog/order-delivery-dialog.component';


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
    private dialog: MatDialog,
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
      const mappedOrder = {...this.createMappedOrderObject(order), form: {isInStoreFormControl: isInStoreFormControl}};
      return mappedOrder;
    }
    
    this.crudService.getActiveOrders().subscribe(
      documents => {
        const mappedOrders = documents.map(ordersMapping);
        this.dataSource = new MatTableDataSource(mappedOrders);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  ngOnInit(): void { }


  openOrderDeliveryDialog(mappedOrder: any) {
    const dialogRef = this.dialog.open(OrderDeliveryDialogComponent, {data: mappedOrder});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.updateStatusProperty(mappedOrder).then(
            () => {
              this.snackBar.open(
                `🟢 Se registró la entrega de ${mappedOrder.isInStore} ${mappedOrder.productName} a ${mappedOrder.resellerDisplayName}`,
                'CERRAR'
              );
              if (result === 'KEEP_ORDER') {
                this.crudService.addOrder(this.createOrderObject(mappedOrder));
              }
            }
          );
        }
      }
    );
  }

  updateIsInStoreProperty(order: any, isInStore: number) {
    this.crudService.orderUpdate(order, {isInStore: isInStore});
  }


  updateStatusProperty(order: any) {
    const status = {
      deliveryAmount: order.isInStore,
      deliveryDate: Date.now(),
      isDelivered: true,
      registerDate: +order.registerDate
    };
    return this.crudService.orderUpdate(order, {status: status});
  }


  private createOrderObject(mappedOrder: any) {
    return {
      reseller: {
        id: mappedOrder.resellerID,
        displayName: mappedOrder.resellerDisplayName
      },
      product: {
        id: mappedOrder.productID,
        brandCode: mappedOrder.productBrandCode,
        name: mappedOrder.productName,
        brand: mappedOrder.productBrand
      },
      status: {isDelivered: false, registerDate: mappedOrder.registerDate}, 
      amount: mappedOrder.amount - mappedOrder.isInStore,
      isInStore: 0
    };
  }


  private createMappedOrderObject (order: any) {
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
      comments: order.comments
    };
  }

}

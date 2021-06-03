import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';
import { OrderDeliveryDialogComponent } from './delivery-order-dialog/order-delivery-dialog.component';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';


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

  COMMENTS_MAXLENGTH = 500;
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
      
      const commentsFormControl = new FormControl('', [
        Validators.maxLength(this.COMMENTS_MAXLENGTH)
      ]);
      commentsFormControl.setValue(order.comments);

      const mappedOrder = {
        ...this.createMappedOrderObject(order),
        form: {
          isInStoreFormControl: isInStoreFormControl,
          commentsFormControl: commentsFormControl
        }
      };

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openCancelOrderDialog(mappedOrder: any) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {data: mappedOrder});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.crudService.deleteOrder(mappedOrder.id, mappedOrder.resellerID).then(
            () => {
              this.snackBar.open(
                `🟢 Se eliminó el pedido ${mappedOrder.productName} de ${mappedOrder.resellerDisplayName}`,
                'CERRAR'
              );
            }
          );
        }
      }
    );
  }


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


  changeTextAreaValue(comments: any, element: any, value: string) {
    comments.value = value;
    element.form.commentsFormControl.value = value;
  }


  updateCommentsProperty(order: any, comments: string) {
    this.crudService.updateOrder(order.id, order.resellerID, {comments: comments});
  }


  updateIsInStoreProperty(order: any, isInStore: number) {
    this.crudService.updateOrder(order.id, order.resellerID, {isInStore: isInStore});
  }


  updateStatusProperty(order: any) {
    const status = {
      deliveryAmount: order.isInStore,
      deliveryDate: Date.now(),
      isDelivered: true,
      registerDate: +order.registerDate
    };
    return this.crudService.updateOrder(order.id, order.resellerID, {status: status});
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
      isInStore: 0,
      comments: ''
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

import { Component, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';
import { AddOrderSheetComponent } from './add-order-sheet/add-order-sheet.component';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
import { DeliveredOrdersListComponent } from './delivered-orders-list-dialog/delivered-orders-list.component';
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

export class OrdersComponent {

  COMMENTS_MAXLENGTH = 500;
  areAllOrdersSelected: boolean;
  areThereSomeOrdersSelected: boolean;
  expandedElement: any;
  dataSource: any;
  tableColumns: string[];
  isLoadingData: boolean;
  @ViewChild(MatSort) sort: any;


  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private crudService: FirebaseCRUDService
  ) {
    this.areAllOrdersSelected = false;
    this.areThereSomeOrdersSelected = false;
    this.isLoadingData = true;

    this.tableColumns = [
      'unfoldIcon',
      'registerDate',
      'resellerDisplayName',
      'productName',
      'productBrand',
      'amount',
      'isInStore',
      'deliveryButton',
      'selectedCheckbox'
    ];

    const orderMapping = (order: any) => {
      const isInStoreFormControl = new FormControl('', [
        Validators.min(0),
        Validators.max(order.amount)
      ]);
      isInStoreFormControl.setValue(order.isInStore);

      const commentsFormControl = new FormControl('', [
        Validators.maxLength(this.COMMENTS_MAXLENGTH)
      ]);
      commentsFormControl.setValue(order.comments);

      const selectedOrderFormControl = new FormControl();
      selectedOrderFormControl.setValue(false);

      const mappedOrder = {
        ...this.createMappedOrderObject(order),
        form: {
          isInStoreFormControl: isInStoreFormControl,
          commentsFormControl: commentsFormControl,
          selectedOrderFormControl: selectedOrderFormControl
        }
      };

      return mappedOrder;
    };

    this.crudService.getActiveOrders().subscribe(
      documents => {
        const mappedOrders = documents.map(orderMapping);
        this.dataSource = new MatTableDataSource(mappedOrders);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openAddResellerSheet() {
    this.bottomSheet.open(AddOrderSheetComponent);
  }


  openCancelOrderDialog(mappedOrder: any) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {data: mappedOrder});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.crudService.deleteOrder(mappedOrder.id, mappedOrder.resellerID).then(
            () => {
              this.snackBar.open(
                `😀 Se eliminó el pedido ${mappedOrder.productName} de ${mappedOrder.resellerDisplayName}`,
                'CERRAR'
              );
            }
          );
        }
      }
    );
  }


  openDeliveredOrdersDialog() {
    const dialogRef = this.dialog.open(DeliveredOrdersListComponent, {disableClose: true, width:'800px'});
    dialogRef.afterClosed().subscribe(
      () => {
        console.log('The dialog was closed');
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
                `😀 Se registró la entrega de ${mappedOrder.isInStore} ${mappedOrder.productName} a ${mappedOrder.resellerDisplayName}`,
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


  selectAllOrders(selected: boolean) {
    this.areAllOrdersSelected = selected;
    const allOrders = this.dataSource.filteredData;
    if(allOrders == null) {
      return;
    }
    allOrders.forEach((order:any) => {
        order.form.selectedOrderFormControl.setValue(selected);
    });
  }


  someOrdersSelected() {
    const allOrders = this.dataSource.filteredData;
    const someOrders = allOrders.filter((order:any) => order.form.selectedOrderFormControl.value);
    if(allOrders == null) {
      return;
    }
    this.areThereSomeOrdersSelected = someOrders.length > 0 && !this.areAllOrdersSelected;
    return this.areThereSomeOrdersSelected;
  }


  changeTextAreaValue(comments: any, element: any, value: string) {
    comments.value = value;
    element.form.commentsFormControl.value = value;
  }


  updateAllSelectedOrders() {
    const allOrders = this.dataSource.filteredData;
    this.areAllOrdersSelected = allOrders != null && allOrders.every((order:any)=>order.form.selectedOrderFormControl.value);
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


  private createMappedOrderObject(order: any) {
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

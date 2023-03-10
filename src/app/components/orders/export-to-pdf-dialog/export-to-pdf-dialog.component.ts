import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-export-to-pdf-dialog',
  templateUrl: './export-to-pdf-dialog.component.html',
  styleUrls: ['./export-to-pdf-dialog.component.scss']
})


export class ExportToPdfDialogComponent {

  selectedOrders: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.selectedOrders = data
    .filter(
      (order:any) => order.form.selectedOrderFormControl.value == true && (order.amount - order.isInStore != 0)
    ).map(
      (order:any) => ({
        amount: order.amount - order.isInStore,
        productName: order.productName,
        productBrandCode: order.productBrandCode
      })
    );
    console.table(this.selectedOrders)
  }

}

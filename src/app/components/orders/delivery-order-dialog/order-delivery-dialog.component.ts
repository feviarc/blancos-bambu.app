import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delivery-order-dialog',
  templateUrl: './order-delivery-dialog.component.html'
})

export class OrderDeliveryDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html'
})

export class CancelOrderDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}

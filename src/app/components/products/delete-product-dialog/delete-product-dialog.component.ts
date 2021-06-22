import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html'
})

export class DeleteProductDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public product: any) { }

}

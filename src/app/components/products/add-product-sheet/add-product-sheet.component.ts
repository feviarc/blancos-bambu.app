import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-product-sheet',
  templateUrl: './add-product-sheet.component.html',
  styleUrls: ['./add-product-sheet.component.scss']
})

export class AddProductSheetComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    console.log(data);
  }

}

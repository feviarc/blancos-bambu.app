import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reseller-info-dialog',
  templateUrl: './reseller-info-dialog.component.html',
  styleUrls: ['./reseller-info-dialog.component.scss']
})

export class ResellerInfoDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public reseller: any
  ) {
    console.log(reseller)
  }

}

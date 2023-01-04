import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-reseller-dialog',
  templateUrl: './delete-reseller-dialog.component.html',
  styleUrls: ['./delete-reseller-dialog.component.scss']
})

export class DeleteResellerDialogComponent {

  deleteCode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public reseller: any) {
    this.deleteCode = reseller.id.substring(0,5);
  }

}

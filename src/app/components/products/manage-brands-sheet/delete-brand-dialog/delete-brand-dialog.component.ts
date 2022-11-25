import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-brand-dialog',
  templateUrl: './delete-brand-dialog.component.html'
})

export class DeleteBrandDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public brand: any) { }

}

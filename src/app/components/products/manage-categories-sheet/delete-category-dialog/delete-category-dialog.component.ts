import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html'
})

export class DeleteCategoryDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public category: any) { }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCRUDService } from 'src/app/shared/services/firebase-crud.service';


@Component({
  selector: 'app-manage-categories-sheet',
  templateUrl: './manage-categories-sheet.component.html',
  styleUrls: ['./manage-categories-sheet.component.scss']
})

export class ManageCategoriesSheetComponent {

  @ViewChild('nameHtmlInput') nameHtmlInput!: ElementRef<HTMLInputElement>;
  categories: any;
  displayedColumns: string[] = ['name', 'crudIcons'];
  nameFormControl: FormControl;


  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private firebaseCRUD: FirebaseCRUDService
  ) {
    this.nameFormControl = new FormControl('',[Validators.required]);
    firebaseCRUD.getCategories().subscribe(
      documents => {
        this.categories = documents;
        console.log(this.categories)
      }
    );
  }

  addCategory(categoryName: string) {
    this.firebaseCRUD.addCategory(categoryName).then(
      () => {
        this.nameFormControl.reset();
        this.nameHtmlInput.nativeElement.focus();
      }
    );
  }

}

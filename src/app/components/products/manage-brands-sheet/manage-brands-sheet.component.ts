import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteBrandDialogComponent } from './delete-brand-dialog/delete-brand-dialog.component';
import { FirebaseCRUDService } from 'src/app/shared/services/firebase-crud.service';

@Component({
  selector: 'app-manage-brands-sheet',
  templateUrl: './manage-brands-sheet.component.html',
  styleUrls: ['./manage-brands-sheet.component.scss']
})

export class ManageBrandsSheetComponent {

  @ViewChild('nameHtmlInput') nameHtmlInput!: ElementRef<HTMLInputElement>;
  brands: any;
  displayedColumns: string[] = ['name', 'crudIcons'];
  nameFormControl: FormControl;


  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private firebaseCRUD: FirebaseCRUDService
  ) {
    this.nameFormControl = new FormControl('', [Validators.required]);
    firebaseCRUD.getBrands().subscribe(
      documents => {
        this.brands = documents;
        console.log(this.brands);
      }
    );
  }


  addBrand(brandName: string) {
    this.firebaseCRUD.addBrand(brandName).then(
      () => {
        this.nameFormControl.reset();
        this.nameHtmlInput.nativeElement.focus();
      }
    );
  }


  openDeleteBrandDialog(brand: any) {
    const dialogRef = this.dialog.open(DeleteBrandDialogComponent, {data: brand});
    dialogRef.afterClosed().subscribe(
      deletionConfirmed => {
        if (deletionConfirmed) {
          this.firebaseCRUD.deleteBrand(brand.id).then(
            () => {
              this.snackBar.open(`😀 Se eliminó la marca ${brand.name}`, 'CERRAR');
            }
          );
        }
      }
    );
  }

}

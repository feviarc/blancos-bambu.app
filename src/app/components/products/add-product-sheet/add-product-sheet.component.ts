import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCRUDService } from 'src/app/shared/services/firebase-crud.service';


@Component({
  selector: 'app-add-product-sheet',
  templateUrl: './add-product-sheet.component.html',
  styleUrls: ['./add-product-sheet.component.scss']
})

export class AddProductSheetComponent {

  private DEFAULT_BRAND = 'SIN MARCA';
  private DEFAULT_CATEGORY = 'GENERAL';
  brands: any;
  categories: any;
  nameFormControl: FormControl;
  brandFormControl: FormControl;
  brandCodeFormControl: FormControl;
  categoryFormControl: FormControl;


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public product: any,
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef,
    private firebaseCRUD: FirebaseCRUDService
  ) {
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.brandCodeFormControl = new FormControl();
    this.brandFormControl = new FormControl();
    this.categoryFormControl = new FormControl();

    firebaseCRUD.getBrands().subscribe(
      documents => {
        this.brands = documents;
      }
    );

    firebaseCRUD.getCategories().subscribe(
      documents => {
        this.categories = documents;
      }
    );

    if (product) {
      this.nameFormControl.setValue(product.name);
      this.brandCodeFormControl.setValue(product.brandCode);
      this.brandFormControl.setValue(product.brand);
      this.categoryFormControl.setValue(product.category);
    } else {
      this.brandFormControl.setValue(this.DEFAULT_BRAND);
      this.categoryFormControl.setValue(this.DEFAULT_CATEGORY);
    }

  }


  saveProduct(id: any, name: string, brandCode: string, brand:string, category: string, pictureURL: string) {
    const now = Date.now();
    const product = {
      id,
      name,
      brandCode,
      brand,
      category,
      pictureURL,
      registered: (id ? this.product.registered : now),
      lastUpdated: now
    };

    this.firebaseCRUD.addProduct(product)
    .then(
      () => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(`😀 Se ${id ? 'actualizó' : 'guardó'} ${product.name}`, 'CERRAR');
      }
    );
  }

}

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCRUDService } from '../../../shared/services/firebase-crud.service';


@Component({
  selector: 'app-add-order-sheet',
  templateUrl: './add-order-sheet.component.html',
  styleUrls: ['./add-order-sheet.component.scss']
})


export class AddOrderSheetComponent {

  brands: any;
  products: any;
  resellers: any;
  brandFormControl: FormControl;
  productFormControl: FormControl;
  amountFormControl: FormControl;
  resellerFormControl: FormControl;


  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private firebaseCRUD: FirebaseCRUDService,
    private snackBar: MatSnackBar
  ) {
    this.brandFormControl = new FormControl('', [
      Validators.required
    ]);

    this.productFormControl = new FormControl('', [
      Validators.required
    ]);

    this.amountFormControl = new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]);
    this.amountFormControl.setValue(1);

    this.resellerFormControl = new FormControl('', [
      Validators.required
    ]);

    firebaseCRUD.getBrands().subscribe(
      documents => {
        this.brands = documents;
      }
    );

    firebaseCRUD.getResellers().subscribe(
      documents => {
        this.resellers = documents;
      }
    );
  }


  saveOrder(reseller: any, product: any, brand: string, amount: any) {
    const order = {
      reseller: {
        id: reseller.id,
        displayName: `${reseller.firstName} ${reseller.lastName}`
      },
      product: {
        id: product.id,
        brandCode: product.brandCode,
        name: product.name,
        brand: brand
      },
      status: {isDelivered: false, registerDate: Date.now()},
      amount: +amount,
      isInStore: 0,
      comments: ``
    };

    this.firebaseCRUD.addOrder(order)
    .then(
      () => {
        this.snackBar.open(
          `😀 Se agregó ${product.name} a la lista de pedidos.`,
          'CERRAR'
        );
        this.bottomSheetRef.dismiss();
      }
    );
  }


  loadProducts(brand: string) {
    if (brand) {
      this.firebaseCRUD.getProductsByBrand(brand).subscribe(
        documents => {
          this.products = documents;
          this.productFormControl.setValue(this.products[0]);
        }
      );
    }
  }

}

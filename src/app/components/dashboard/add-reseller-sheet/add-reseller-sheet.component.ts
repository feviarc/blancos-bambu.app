import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCRUDService } from '../../../shared/services/firebase-crud.service';
import { Order } from '../../../shared/models/order.model';


@Component({
  selector: 'app-add-reseller-sheet',
  templateUrl: './add-reseller-sheet.component.html',
  styleUrls: ['./add-reseller-sheet.component.scss']
})


export class AddResellerSheetComponent implements OnInit {

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
    this.brandFormControl = new FormControl('',[
      Validators.required
    ]);

    this.productFormControl = new FormControl('', [
      Validators.required
    ]);

    this.amountFormControl = new FormControl('',[
      Validators.required,
      Validators.min(1)
    ]);
    this.amountFormControl.setValue(1);

    this.resellerFormControl = new FormControl('',[
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


  ngOnInit(): void { }


  add(reseller: any, product: any, brand: string, amount: any) {
    const order = {
      reseller: {
        id: reseller.id,
        displayName: `${reseller.firstName} ${reseller.lastNameF} ${reseller.lastNameM}`
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
          `🟢 Se agregó ${product.name} a la lista de pedidos.`,
          'CERRAR'
        );
        this.bottomSheetRef.dismiss();
      }
    );
  }


  loadProducts(brand: string) {
    if(brand) {
      this.firebaseCRUD.getProductsByBrand(brand).subscribe(
        documents => {
          this.products = documents;
          this.productFormControl.setValue(this.products[0]);
        }
      );
    }
  }

}     

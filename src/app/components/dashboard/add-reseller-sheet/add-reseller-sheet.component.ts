import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FirebaseCRUDService } from '../../../shared/services/firebase-crud.service';
import { Order } from '../../../shared/models/order.model';


@Component({
  selector: 'app-add-reseller-sheet',
  templateUrl: './add-reseller-sheet.component.html',
  styleUrls: ['./add-reseller-sheet.component.scss']
})


export class AddResellerSheetComponent implements OnInit {

  products: any;
  resellers: any;
  productFormControl: FormControl;
  amountFormControl: FormControl;
  resellerFormControl: FormControl;

  
  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private firebaseCRUD: FirebaseCRUDService
  ) {
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

    firebaseCRUD.getAllProducts().subscribe(
      documents => {
        this.products = documents;
      }
    );
    
    firebaseCRUD.getResellers().subscribe(
      documents => {
        this.resellers = documents;
      }
    );
  }


  ngOnInit(): void { }


  add(reseller: any, product: any, amount: any) {
    const order = <Order> {
      reseller: {
        id: reseller.id,
        displayName: `${reseller.firstName} ${reseller.lastNameF} ${reseller.lastNameM}`
      },
      product: {
        id: product.id,
        brandCode: product.brandCode,
        name: product.name
      },
      status: {isDelivered: false, registerDate: Date.now()}, 
      amount: amount,
      isInStore: 0
    };
    
    this.firebaseCRUD.addOrder(order)
    .then(
      () => {
        window.alert(product.name);
        this.bottomSheetRef.dismiss();
      }
    )
    .catch(
      error => {
        window.alert(error);
      }
    );
  }

}     

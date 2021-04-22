import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FirebaseCRUDService } from '../../../shared/services/firebase-crud.service';


@Component({
  selector: 'app-add-reseller-sheet',
  templateUrl: './add-reseller-sheet.component.html',
  styleUrls: ['./add-reseller-sheet.component.scss']
})


export class AddResellerSheetComponent implements OnInit {

  products: string[];
  resellers: string[];
  productFormControl: FormControl;
  amountFormControl: FormControl;
  resellerFormControl: FormControl;

  
  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    public firebaseCRUD: FirebaseCRUDService
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

    this.resellers = [
      'CINTHYA BELMAN GUZMAN',
      'ANA VALERIA GUZMAN',
      'MARIA DE LA LUZ LUJANO'
    ];
    this.products = [
      'COBERTOR HOJARASCA KS',
      'COBERTOR MAT APCH',
      'COBERTOR NUUK NORDICO MAT',
      'EDRE PINSONIC LIA MAT',
      'EDREDON LIGERO MAGNOLIA MAT',
      'PROTECTOR COLCHON IND',
      'SABANA CON COBERTOR LIGERO MAT',
      'SABANA POLAR MAT'
    ];  
  }


  ngOnInit(): void { }


  add(product: string, amount: string, reseller: string) {
    this.firebaseCRUD.addOrder();
    this.bottomSheetRef.dismiss();
  }

}

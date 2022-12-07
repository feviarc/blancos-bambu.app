import { Component, Inject } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-add-reseller-sheet',
  templateUrl: './add-reseller-sheet.component.html',
  styleUrls: ['./add-reseller-sheet.component.scss']
})

export class AddResellerSheetComponent {

  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  stateFormControl: FormControl;
  cityFormControl: FormControl;
  suburbFormControl: FormControl;
  streetFormControl: FormControl;
  extNumberFormControl: FormControl;
  intNumberFormControl: FormControl;
  cellphoneSegment1FormControl: FormControl;
  cellphoneSegment2FormControl: FormControl;
  cellphoneSegment3FormControl: FormControl;
  emailFormControl: FormControl;


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public reseller: any
  ) {
    this.firstNameFormControl = new FormControl('', [Validators.required]);
    this.lastNameFormControl = new FormControl('', [Validators.required]);
    this.stateFormControl = new FormControl();
    this.cityFormControl = new FormControl();
    this.suburbFormControl = new FormControl();
    this.streetFormControl = new FormControl();
    this.extNumberFormControl = new FormControl();
    this.intNumberFormControl = new FormControl();
    this.cellphoneSegment1FormControl = new FormControl('', this.cellphoneValidators(3));
    this.cellphoneSegment2FormControl = new FormControl('', this.cellphoneValidators(3));
    this.cellphoneSegment3FormControl = new FormControl('', this.cellphoneValidators(4));
    this.emailFormControl = new FormControl('', [Validators.email]);
  }


  cellphoneValidators(digits: number) {
    let pattern = '';

    for(let i=0; i<digits; i++) {
      pattern = pattern + '[0-9]'
    }

    return new Array (
      Validators.required,
      Validators.minLength(digits),
      Validators.pattern(pattern)
    );
  }

}

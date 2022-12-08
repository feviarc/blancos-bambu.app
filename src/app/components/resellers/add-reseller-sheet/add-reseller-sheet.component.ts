import { state } from '@angular/animations';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

    if (reseller) {
      this.fieldsFormControlSetValues();
    }
  }


  private cellphoneValidators(digits: number) {
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


  private fieldsFormControlSetValues() {
      this.firstNameFormControl.setValue(this.reseller.firstName);
      this.lastNameFormControl.setValue(this.reseller.lastName);
      this.cellphoneSegment1FormControl.setValue(this.reseller.mobilePhone.substring(0,3));
      this.cellphoneSegment2FormControl.setValue(this.reseller.mobilePhone.substring(3,6));
      this.cellphoneSegment3FormControl.setValue(this.reseller.mobilePhone.substring(6,10));
      if (this.reseller.address) {
        this.stateFormControl.setValue(this.reseller.address.state || '');
        this.cityFormControl.setValue(this.reseller.address.city || '');
        this.suburbFormControl.setValue(this.reseller.address.suburb || '');
        this.streetFormControl.setValue(this.reseller.address.street || '');
        this.extNumberFormControl.setValue(this.reseller.address.extNumber || '');
        this.intNumberFormControl.setValue(this.reseller.address.intNumber || '');
      }
      if (this.reseller.email) {
        this.emailFormControl.setValue(this.reseller.email);
      }
  }


  get isAddFormInvalid() {
    const validation =
    (
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.cellphoneSegment1FormControl.valid &&
      this.cellphoneSegment2FormControl.valid &&
      this.cellphoneSegment3FormControl.valid &&
      this.emailFormControl.valid
    )
    ? false : true;

    return validation;
  }


  get isUpdateFormInvalid() {
    const validation =
    (
      this.firstNameFormControl.value == this.reseller.firstName &&
      this.lastNameFormControl.value == this.reseller.lastName &&
      this.stateFormControl.value == this.reseller.address.state &&
      this.cityFormControl.value == this.reseller.address.city &&
      this.suburbFormControl.value == this.reseller.address.suburb &&
      this.streetFormControl.value == this.reseller.address.street &&
      this.extNumberFormControl.value == this.reseller.address.extNumber &&
      this.intNumberFormControl.value == this.reseller.address.intNumber &&
      this.cellphoneSegment1FormControl.value == this.reseller.mobilePhone.substring(0,3) &&
      this.cellphoneSegment2FormControl.value == this.reseller.mobilePhone.substring(3,6) &&
      this.cellphoneSegment3FormControl.value == this.reseller.mobilePhone.substring(6,10) &&
      this.emailFormControl.value == this.reseller.email
    )
    ? true : false;

    return validation;
  }

}

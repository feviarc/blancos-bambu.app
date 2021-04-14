import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResellerSheetComponent } from './add-reseller-sheet.component';

describe('AddResellerSheetComponent', () => {
  let component: AddResellerSheetComponent;
  let fixture: ComponentFixture<AddResellerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResellerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResellerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

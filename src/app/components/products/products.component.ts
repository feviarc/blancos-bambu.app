import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';
import { AddProductSheetComponent } from './add-product-sheet/add-product-sheet.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {

  isLoadingData: boolean;
  dataSource: any;
  tableColumns: string[];
  @ViewChild(MatSort) sort: any;

  constructor(
    private matBottomSheet: MatBottomSheet,
    public crudService: FirebaseCRUDService
  ) {
    this.isLoadingData = true;

    this.tableColumns = [
      'name',
      'brandCode',
      'brand',
      'category',
      'crudIcons'
    ];

    this.crudService.getProducts().subscribe(
      products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openAddProductSheet(product: any) {
    this.matBottomSheet.open(AddProductSheetComponent, {data: product});
  }


  deleteProduct(id: string) { }

}

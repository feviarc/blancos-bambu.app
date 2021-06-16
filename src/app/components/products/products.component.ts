import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';

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

  constructor(public crudService: FirebaseCRUDService) {
    this.isLoadingData = true;

    this.tableColumns = [
      'name',
      'brand',
      'brandCode',
      'category',
      'crudIcons'
    ];

    this.crudService.getAllProducts().subscribe(
      products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      }
    );
  }

}

import { Component } from '@angular/core';
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
        this.dataSource = products;
        this.isLoadingData = false;
      }
    );
  }

}

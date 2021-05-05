import { Component, OnInit } from '@angular/core';
import { FirebaseCRUDService } from '../../shared/services/firebase-crud.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  displayedColumns: string[];
  isLoadingData: boolean;
  orders: any;


  constructor(private crudService: FirebaseCRUDService) {
    this.displayedColumns = [
      'productName',
      'productBrand',
      'brandCode',
      'reseller',
      'registerDate',
      'crud-icons'
    ];
    this.isLoadingData = true;
    this.crudService.getActiveOrders().subscribe(
      documents => {
        this.orders = documents;
        this.isLoadingData = false;
        console.log('OrdersComponent');
        
      }
    );
  }


  ngOnInit(): void { }

}

import { Component } from '@angular/core';

export interface DeliveredOrder {
  amount: number;
  name: string;
  reseller: string;
  deliveryDate: string;
}

const ELEMENT_DATA: DeliveredOrder[] = [
  {amount: 1, name: 'Hydrogen', reseller: '1.0079', deliveryDate: 'H'},
  {amount: 2, name: 'Helium', reseller: '4.0026', deliveryDate: 'He'},
  {amount: 3, name: 'Lithium', reseller: '6.941', deliveryDate: 'Li'},
  {amount: 4, name: 'Beryllium', reseller: '9.0122', deliveryDate: 'Be'},
  {amount: 5, name: 'Boron', reseller: '10.811', deliveryDate: 'B'},
  {amount: 6, name: 'Carbon', reseller: '12.0107', deliveryDate: 'C'},
  {amount: 7, name: 'Nitrogen', reseller: '14.0067', deliveryDate: 'N'},
  {amount: 8, name: 'Oxygen', reseller: '15.9994', deliveryDate: 'O'},
  {amount: 9, name: 'Fluorine', reseller: '18.9984', deliveryDate: 'F'},
  {amount: 10, name: 'Neon', reseller: '20.1797', deliveryDate: 'Ne'},
  {amount: 1, name: 'Hydrogen', reseller: '1.0079', deliveryDate: 'H'},
  {amount: 2, name: 'Helium', reseller: '4.0026', deliveryDate: 'He'},
  {amount: 3, name: 'Lithium', reseller: '6.941', deliveryDate: 'Li'},
  {amount: 4, name: 'Beryllium', reseller: '9.0122', deliveryDate: 'Be'},
  {amount: 5, name: 'Boron', reseller: '10.811', deliveryDate: 'B'},
  {amount: 6, name: 'Carbon', reseller: '12.0107', deliveryDate: 'C'},
  {amount: 7, name: 'Nitrogen', reseller: '14.0067', deliveryDate: 'N'},
  {amount: 8, name: 'Oxygen', reseller: '15.9994', deliveryDate: 'O'},
  {amount: 9, name: 'Fluorine', reseller: '18.9984', deliveryDate: 'F'},
  {amount: 10, name: 'Neon', reseller: '20.1797', deliveryDate: 'Ne'},
  {amount: 1, name: 'Hydrogen', reseller: '1.0079', deliveryDate: 'H'},
  {amount: 2, name: 'Helium', reseller: '4.0026', deliveryDate: 'He'},
  {amount: 3, name: 'Lithium', reseller: '6.941', deliveryDate: 'Li'},
  {amount: 4, name: 'Beryllium', reseller: '9.0122', deliveryDate: 'Be'},
  {amount: 5, name: 'Boron', reseller: '10.811', deliveryDate: 'B'},
  {amount: 6, name: 'Carbon', reseller: '12.0107', deliveryDate: 'C'},
  {amount: 7, name: 'Nitrogen', reseller: '14.0067', deliveryDate: 'N'},
  {amount: 8, name: 'Oxygen', reseller: '15.9994', deliveryDate: 'O'},
  {amount: 9, name: 'Fluorine', reseller: '18.9984', deliveryDate: 'F'},
  {amount: 10, name: 'Neon', reseller: '20.1797', deliveryDate: 'Ne'},
  {amount: 1, name: 'Hydrogen', reseller: '1.0079', deliveryDate: 'H'},
  {amount: 2, name: 'Helium', reseller: '4.0026', deliveryDate: 'He'},
  {amount: 3, name: 'Lithium', reseller: '6.941', deliveryDate: 'Li'},
  {amount: 4, name: 'Beryllium', reseller: '9.0122', deliveryDate: 'Be'},
  {amount: 5, name: 'Boron', reseller: '10.811', deliveryDate: 'B'},
  {amount: 6, name: 'Carbon', reseller: '12.0107', deliveryDate: 'C'},
  {amount: 7, name: 'Nitrogen', reseller: '14.0067', deliveryDate: 'N'},
  {amount: 8, name: 'Oxygen', reseller: '15.9994', deliveryDate: 'O'},
  {amount: 9, name: 'Fluorine', reseller: '18.9984', deliveryDate: 'F'},
  {amount: 10, name: 'Neon', reseller: '20.1797', deliveryDate: 'Ne'},
  {amount: 1, name: 'Hydrogen', reseller: '1.0079', deliveryDate: 'H'},
  {amount: 2, name: 'Helium', reseller: '4.0026', deliveryDate: 'He'},
  {amount: 3, name: 'Lithium', reseller: '6.941', deliveryDate: 'Li'},
  {amount: 4, name: 'Beryllium', reseller: '9.0122', deliveryDate: 'Be'},
  {amount: 5, name: 'Boron', reseller: '10.811', deliveryDate: 'B'},
  {amount: 6, name: 'Carbon', reseller: '12.0107', deliveryDate: 'C'},
  {amount: 7, name: 'Nitrogen', reseller: '14.0067', deliveryDate: 'N'},
  {amount: 8, name: 'Oxygen', reseller: '15.9994', deliveryDate: 'O'},
  {amount: 9, name: 'Fluorine', reseller: '18.9984', deliveryDate: 'F'},
  {amount: 10, name: 'Neon', reseller: '20.1797', deliveryDate: 'Ne'},
];

@Component({
  selector: 'app-delivered-orders-list',
  templateUrl: './delivered-orders-list.component.html',
  styleUrls: ['./delivered-orders-list.component.scss']
})

export class DeliveredOrdersListComponent {

  displayedColumns: string[] = ['amount', 'name', 'reseller', 'deliveryDate'];
  dataSource = ELEMENT_DATA;

  constructor() { }

}

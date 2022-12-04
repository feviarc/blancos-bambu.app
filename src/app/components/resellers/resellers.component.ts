import { Component } from '@angular/core';


@Component({
  selector: 'app-resellers',
  templateUrl: './resellers.component.html',
  styleUrls: ['./resellers.component.scss']
})

export class ResellersComponent {

  isLoadingData: boolean;
  dataSource: any;
  tableColumns: string[];

  constructor() {
    this.isLoadingData = true;
    this.tableColumns = [
      'firstName',
      'lastName',
      'mobilePhone',
      'crudIcons'
    ];
    this.dataSource = [
      {firstName: 'Felipe de Jesús', lastNameF: 'Víctor', lastNameM: 'Arceo', mobilePhone: '3531003631'},
      {firstName: 'Ivett', lastNameF: 'López', lastNameM: 'Gutiérrez', mobilePhone: '3531008331'},
    ]
  }


  applyFilter(event: Event) {
    console.log(event);
  }


  openAddResellerSheet(reseller: any) {
    console.log(reseller);
  }

}
